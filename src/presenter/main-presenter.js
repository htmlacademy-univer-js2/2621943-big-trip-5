import CurrentEventView from '../view/current-event-view.js';
import EventsListView from '../view/events-list-view.js';
import FiltersView from '../view/filters-view.js';
import FormEditorView from '../view/form-editor-view.js';
import SortView from '../view/sort-view.js';
import {render, replace} from '../framework/render.js';

export default class MainPresenter {
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
    this.cityDestinationsList = [...this.#eventModel.destinations];

    render(new FiltersView(), this.#filterContainer);
    render(new SortView(), this.#listContainer);
    render(this.#eventsComponent, this.#listContainer);

    for (let i = 0; i < this.eventsList.length; ++i) {
      this.#renderPoint(this.eventsList[i]);
    }
  }

  #renderPoint(point) {
    const onDocumentKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        switchToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    const pointComponent = new CurrentEventView({
      point,
      offers: this.offersList,
      cityDestinations: this.cityDestinationsList,
      onEditClick: () => {
        switchToEditForm();
        document.addEventListener('keydown', onDocumentKeydown);
      }
    });

    const formEditComponent = new FormEditorView({
      point,
      offers: this.offersList,
      cityDestinations: this.cityDestinationsList,
      onFormSubmit: () => {
        switchToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      },
      onFormReset: () => {
        switchToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    });

    function switchToEditForm() {
      replace(formEditComponent, pointComponent);
    }

    function switchToPoint() {
      replace(pointComponent, formEditComponent);
    }

    render(pointComponent, this.#eventsComponent.element);
  }
}
