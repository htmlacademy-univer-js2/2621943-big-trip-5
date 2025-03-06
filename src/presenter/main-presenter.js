import CurrentEventView from '../view/current-event-view.js';
import EventsListView from '../view/events-list-view.js';
import FiltersView from '../view/filters-view.js';
import FormCreationView from '../view/form-creation-view.js';
import FormEditorView from '../view/form-editor-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class MainPresenter {
  eventListComponent = new EventsListView();


  constructor(eventsContainer, filterContainer, eventModel) {
    this.eventsContainer = eventsContainer;
    this.filterContainer = filterContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.eventsList = [...this.eventModel.getEvents()];
    this.offersList = [...this.eventModel.getOffers()];

    render(new FiltersView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new FormEditorView({event: this.eventsList[0], offers: this.offersList}), this.eventListComponent.getElement());

    for (let i = 1; i < this.eventsList.length; i++) {
      const eventOffers = this.offersList.find((offer) => offer.type === this.eventsList[i].type);
      render(new CurrentEventView({event: this.eventsList[i], offers: eventOffers}), this.eventListComponent.getElement());
    }

    render(new FormCreationView(), this.eventListComponent.getElement());
  }
}
