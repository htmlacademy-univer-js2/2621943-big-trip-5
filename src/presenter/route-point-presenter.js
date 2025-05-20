import CurrentEventView from '../view/current-event-view.js';
import FormEditorView from '../view/form-editor-view.js';
import {render, replace, remove} from '../framework/render.js';


const RoutePointModes = {
  SHOW: 'SHOW',
  EDIT: 'EDIT'
};

export default class RoutePointPresenter {
  #routePoint = null;
  #offers = [];
  #cityDestinations = [];
  #currentMode = RoutePointModes.SHOW;

  #routePointComponent = null;
  #routePointEditComponent = null;
  #routePointsContainer = null;

  #handleRoutePointContentChange = null;
  #handleRoutePointModeChange = null;

  constructor({routePointsContainer, offers, cityDestinations, contentChange, routePointModeChange}) {
    this.#routePointsContainer = routePointsContainer;
    this.#offers = offers;
    this.#cityDestinations = cityDestinations;
    this.#handleRoutePointContentChange = contentChange;
    this.#handleRoutePointModeChange = routePointModeChange;
  }

  init(routePoint) {
    this.#routePoint = routePoint;

    const previousRoutePointComponent = this.#routePointComponent;
    const previousRoutePointEditComponent = this.#routePointEditComponent;

    this.#routePointComponent = new CurrentEventView({
      routePoint: this.#routePoint,
      offers: this.#offers,
      cityDestinations: this.#cityDestinations,

      onEditClick: () => {
        this.#replaceRoutePointToEditForm();
      },

      onFavoriteClick: () => {
        this.#handleRoutePointContentChange({...this.#routePoint, isFavorite: !this.#routePoint.isFavorite});
      }
    });

    this.#routePointEditComponent = new FormEditorView({
      routePoint: this.#routePoint,
      offers: this.#offers,
      cityDestinations: this.#cityDestinations,

      onFormSubmit: () => {
        this.#replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', this.#escapeKeydownHandler);
      },

      onFormReset: () => {
        this.#replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', this.#escapeKeydownHandler);
      }
    });

    if (previousRoutePointComponent === null || previousRoutePointEditComponent === null) {
      render(this.#routePointComponent, this.#routePointsContainer);
      return;
    }

    if (this.#currentMode === RoutePointModes.SHOW) {
      replace(this.#routePointComponent, previousRoutePointComponent);
    }

    if (this.#currentMode === RoutePointModes.EDIT) {
      replace(this.#routePointEditComponent, previousRoutePointEditComponent);
    }

    remove(previousRoutePointComponent);
    remove(previousRoutePointEditComponent);
  }

  resetFormView() {
    if (this.#currentMode !== RoutePointModes.SHOW) {
      this.#replaceEditFormToRoutePoint();
    }
  }

  #replaceRoutePointToEditForm() {
    replace(this.#routePointEditComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#handleRoutePointModeChange();
    this.#currentMode = RoutePointModes.EDIT;
  }

  #replaceEditFormToRoutePoint() {
    replace(this.#routePointComponent, this.#routePointEditComponent);
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
    this.#currentMode = RoutePointModes.SHOW;
  }

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToRoutePoint();
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
    }
  };
}
