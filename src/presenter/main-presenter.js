import EventsListView from '../view/events-list-view.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import SortView from '../view/sort-view.js';
import NewEventView from '../view/new-event-view.js';
import ContentLoadingView from '../view/content-loading-view.js';
import ContentLoadingErrorView from '../view/content-loading-error-view.js';

import RoutePointPresenter from './route-point-presenter.js';
import NewRoutePointPresenter from './new-route-point-presenter.js';

import {remove, render} from '../framework/render.js';
import {sortByTypes, filter} from '../utils.js';
import {SortingTypes, FilterEventsCaptions, FilterTypes, ActionTypes, UserActionTypes, TimeLimits} from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class MainPresenter {
  #routePointPresenters = new Map();
  #newRoutePointPresenter = null;

  #eventsComponent = new EventsListView();
  #captionsComponent = null;
  #sortingComponent = null;
  #addEventButtonComponent = null;
  #contentLoadingComponent = new ContentLoadingView();
  #contentLoadingErrorComponent = new ContentLoadingErrorView();

  #listContainer = null;
  #eventButtonContainer = null;

  #eventModel = null;
  #offerModel = null;
  #cityDestinationModel = null;
  #filterModel = null;

  #chosenSortingType = SortingTypes.DAY;
  #isContentLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimits.LOWER_BOUND,
    upperLimit: TimeLimits.UPPER_BOUND,
  });


  constructor(listContainer, buttonContainer, eventModel, offerModel, cityDestinationModel, filterModel) {
    this.#listContainer = listContainer;
    this.#eventButtonContainer = buttonContainer;
    this.#eventModel = eventModel;
    this.#offerModel = offerModel;
    this.#cityDestinationModel = cityDestinationModel;
    this.#filterModel = filterModel;

    this.#eventModel.addObserver(this.#handleGeneralActions);
    this.#filterModel.addObserver(this.#handleGeneralActions);
  }

  get events() {
    const chosenEvents = filter[this.#filterModel.filter](this.#eventModel.events);
    sortByTypes[this.#chosenSortingType](chosenEvents);
    return chosenEvents;
  }

  get offers() {
    return this.#offerModel.offers;
  }

  get cityDestinations() {
    return this.#cityDestinationModel.cityDestinations;
  }

  init() {
    this.#renderRoutePointsListToShow();
  }

  #renderAddEventButtonComponent() {
    this.#addEventButtonComponent = new NewEventView({onNewEventClick: this.#handleCreatingEventClick});
    render(this.#addEventButtonComponent, this.#eventButtonContainer);
  }

  #renderSortingList() {
    this.#sortingComponent = new SortView({onSortingTypeChange: this.#handleSortingTypeChange, currentSortingType: this.#chosenSortingType});
    render(this.#sortingComponent, this.#listContainer);
  }

  #renderRoutePoint(routePoint) {
    const routePointPresenter = new RoutePointPresenter({
      routePointsContainer: this.#eventsComponent.element,
      offers: this.offers,
      cityDestinations: this.cityDestinations,
      contentChange: this.#handleUserActions,
      routePointModeChange: this.#handleShowModeChange
    });
    routePointPresenter.init(routePoint);
    this.#routePointPresenters.set(routePoint.id, routePointPresenter);
  }

  #renderRoutePoints() {
    render(this.#eventsComponent, this.#listContainer);
    for (let i = 0; i < this.events.length; i++) {
      this.#renderRoutePoint(this.events[i]);
    }
  }

  #renderRoutePointsListToShow({isSortingTypeUnselected = false} = {}) {
    if (this.#isContentLoading) {
      render(this.#contentLoadingComponent, this.#listContainer);
      return;
    }

    if (this.events.length === 0) {
      this.#renderEmptyEventsListComponent();
      return;
    }

    if (isSortingTypeUnselected) {
      this.#chosenSortingType = SortingTypes.DAY;
    }

    this.#renderSortingList();
    this.#renderRoutePoints();
  }

  #renderEmptyEventsListComponent() {
    this.#captionsComponent = new EmptyEventsListView({caption: FilterEventsCaptions[this.#filterModel.filter]});
    render(this.#captionsComponent, this.#listContainer);
  }

  #renderContentLoadingErrorComponent() {
    render(this.#contentLoadingErrorComponent, this.#listContainer);
  }

  #clearEvents() {
    this.#routePointPresenters.forEach((presenter) => presenter.destroyRoutePoint());
  }

  #clearEventsListToShow() {
    remove(this.#captionsComponent);
    remove(this.#contentLoadingComponent);
    remove(this.#contentLoadingErrorComponent);
    remove(this.#sortingComponent);
    if (this.#newRoutePointPresenter) {
      this.#newRoutePointPresenter.destroy();
    }
    this.#clearEvents();
  }

  #handleUserActions = async (userActionType, actionType, update) => {
    this.#uiBlocker.block();
    switch (userActionType) {
      case UserActionTypes.ADD_EVENT:
        this.#newRoutePointPresenter.setServerSaving();
        try {
          await this.#eventModel.add(actionType, update);
        } catch(error) {
          this.#newRoutePointPresenter.setServerAborting();
        }
        break;
      case UserActionTypes.UPDATE_EVENT:
        this.#routePointPresenters.get(update.id).setServerSaving();
        try {
          await this.#eventModel.update(actionType, update);
        } catch(error) {
          this.#routePointPresenters.get(update.id).setServerAborting();
        }
        break;
      case UserActionTypes.DELETE_EVENT:
        this.#routePointPresenters.get(update.id).setServerDeleting();
        try {
          await this.#eventModel.remove(actionType, update);
        } catch(error) {
          this.#routePointPresenters.get(update.id).setServerAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleGeneralActions = (actionType, data) => {
    switch (actionType) {
      case ActionTypes.PATCH:
        this.#routePointPresenters.get(data.id).init(data);
        break;
      case ActionTypes.MAJOR:
        this.#clearEventsListToShow();
        this.#renderRoutePointsListToShow();
        break;
      case ActionTypes.INIT:
        this.#isContentLoading = false;
        remove(this.#contentLoadingComponent);
        this.#renderRoutePointsListToShow();
        this.#renderAddEventButtonComponent();
        break;
      case ActionTypes.ERROR:
        this.#isContentLoading = false;
        remove(this.#contentLoadingComponent);
        this.#renderContentLoadingErrorComponent();
        this.#renderAddEventButtonComponent();
        break;
    }
  };

  #handleShowModeChange = () => {
    this.#routePointPresenters.forEach((presenter) => presenter.resetFormView());
  };

  #handleSortingTypeChange = (evt) => {
    if (evt.target.closest('input')) {
      if (this.#chosenSortingType === evt.target.dataset.sortType) {
        return;
      }
      this.#chosenSortingType = evt.target.dataset.sortType;
      this.#clearEvents();
      this.#renderRoutePoints();
    }
  };

  #handleCreatingEventClick = () => {
    this.#addEventButtonComponent.element.disabled = true;
    this.#newRoutePointPresenter = new NewRoutePointPresenter({
      routePointContainer: this.#eventsComponent.element,
      offers: this.offers,
      cityDestinations: this.cityDestinations,
      contentChange: this.#handleUserActions,
      onFormReset: this.#handleClosingCreatingEventForm
    });
    this.#chosenSortingType = SortingTypes.DAY;
    this.#filterModel.setToCurrent(ActionTypes.MAJOR, FilterTypes.EVERYTHING);
    this.#newRoutePointPresenter.init();
  };

  #handleClosingCreatingEventForm = () => {
    this.#addEventButtonComponent.element.disabled = false;
  };
}
