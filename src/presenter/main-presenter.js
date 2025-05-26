import EventsListView from '../view/events-list-view.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import SortView from '../view/sort-view.js';
import NewEventView from '../view/new-event-view.js';

import RoutePointPresenter from './route-point-presenter.js';
import NewRoutePointPresenter from './new-route-point-presenter.js';

import {remove, render} from '../framework/render.js';
import {sortByTypes, filter} from '../utils.js';
import {SortingTypes, FilterEventsCaptions, FilterTypes, ActionTypes, UserActionTypes} from '../const.js';

export default class MainPresenter {
  #routePointPresenters = new Map();

  #eventsComponent = new EventsListView();
  #captionsComponent = null;
  #sortingComponent = null;
  #addEventButtonComponent = null;

  #listContainer = null;
  #eventButtonContainer = null;

  #eventModel = null;
  #offerModel = null;
  #cityDestinationModel = null;
  #filterModel = null;

  #chosenSortingType = SortingTypes.DAY;


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
    this.#addEventButtonComponent = new NewEventView({onNewEventClick: this.#handleCreatingEventClick});
    render(this.#addEventButtonComponent, this.#eventButtonContainer);
    this.#renderRoutePointsListToShow();
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

  #renderRoutePointsListToShow() {
    if (this.events.length === 0) {
      this.#renderEmptyEventsListComponent();
      return;
    }
    this.#renderSortingList();
    this.#renderRoutePoints();
  }

  #renderEmptyEventsListComponent() {
    this.#captionsComponent = new EmptyEventsListView({caption: FilterEventsCaptions[this.#filterModel.filter]});
    render(this.#captionsComponent, this.#listContainer);
  }

  #clearEvents() {
    this.#routePointPresenters.forEach((presenter) => presenter.destroyRoutePoint());
  }

  #clearEventsListToShow() {
    remove(this.#captionsComponent);
    remove(this.#sortingComponent);
    this.#clearEvents();
  }

  #handleUserActions = (userActionType, actionType, update) => {
    switch (userActionType) {
      case UserActionTypes.ADD_EVENT:
        this.#eventModel.add(actionType, update);
        break;
      case UserActionTypes.UPDATE_EVENT:
        this.#eventModel.update(actionType, update);
        break;
      case UserActionTypes.DELETE_EVENT:
        this.#eventModel.remove(actionType, update);
        break;
    }
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
    const newRoutePointPresenter = new NewRoutePointPresenter({
      routePointContainer: this.#eventsComponent.element,
      offers: this.offers,
      cityDestinations: this.cityDestinations,
      contentChange: this.#handleUserActions,
      onFormReset: this.#handleClosingCreatingEventForm
    });
    this.#chosenSortingType = SortingTypes.DAY;
    this.#filterModel.setToCurrent(ActionTypes.MAJOR, FilterTypes.EVERYTHING);
    newRoutePointPresenter.init();
  };

  #handleClosingCreatingEventForm = () => {
    this.#addEventButtonComponent.element.disabled = false;
  };
}
