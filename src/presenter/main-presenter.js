import EventsListView from '../view/events-list-view.js';
import EmptyEventsListView from '../view/empty-events-list-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';

import RoutePointPresenter from './route-point-presenter.js';

import {render} from '../framework/render.js';
import {editListElement} from '../utils.js';

export default class MainPresenter {
  #routePointsPresenters = new Map();
  #eventsComponent = new EventsListView();
  #listContainer = null;
  #filterContainer = null;
  #eventModel = null;


  constructor(listContainer, filterContainer, eventModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#eventModel = eventModel;
  }


  init() {
    this.eventsList = [...this.#eventModel.events];
    this.offersList = [...this.#eventModel.offers];
    this.cityDestinationsList = [...this.#eventModel.cityDestinations];

    this.#renderFilterViews();

    if (this.eventsList.length === 0) {
      render(new EmptyEventsListView(), this.#listContainer);
      return;
    }

    this.#renderRoutePoints();
  }

  #renderFilterViews() {
    render(new FiltersView({events: this.eventsList}), this.#filterContainer);
  }

  #renderRoutePoints() {
    render(new SortView(), this.#listContainer);
    render(this.#eventsComponent, this.#listContainer);

    for (let i = 0; i < this.eventsList.length; ++i) {
      this.#renderRoutePoint(this.eventsList[i]);
    }
  }

  #renderRoutePoint(routePoint) {
    const routePointPresenter = new RoutePointPresenter({
      routePointsContainer: this.#eventsComponent.element,
      offers: this.offersList,
      cityDestinations: this.cityDestinationsList,
      contentChange: this.#handleRoutePointContentChange,
      routePointModeChange: this.#handleRoutePointModeChange
    });

    routePointPresenter.init(routePoint);
    this.#routePointsPresenters.set(routePoint.id, routePointPresenter);
  }

  #handleRoutePointContentChange = (routePoint) => {
    this.eventsList = editListElement(this.eventsList, routePoint);
    this.#routePointsPresenters.get(routePoint.id).init(routePoint);
  };

  #handleRoutePointModeChange = () => {
    this.#routePointsPresenters.forEach((presenter) => presenter.resetFormView());
  };
}
