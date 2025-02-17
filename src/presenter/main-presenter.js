import CurrentEventView from '../view/current-event-view.js';
import EventsListView from '../view/events-list-view.js';
import FiltersView from '../view/filters-view.js';
import FormCreationView from '../view/form-creation-view.js';
import FormEditorView from '../view/form-editor-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class MainPresenter {
  eventListComponent = new EventsListView();


  constructor() {
    this.eventsContainer = document.querySelector('.trip-events');
    this.filterContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    render(new FiltersView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new FormEditorView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new CurrentEventView(), this.eventListComponent.getElement());
    }

    render(new FormCreationView(), this.eventListComponent.getElement());
  }
}
