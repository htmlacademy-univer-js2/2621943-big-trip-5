import CurrentEventView from '../view/current-event-view.js';
import FormEditorView from '../view/form-editor-view.js';
import {render, replace, remove} from '../framework/render.js';
import {isCurrentKeyEscape} from '../utils.js';
import {ActionTypes, UserActionTypes} from '../const.js';

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

      onEditClick: this.#editClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#routePointEditComponent = new FormEditorView({
      routePoint: this.#routePoint,
      offers: this.#offers,
      cityDestinations: this.#cityDestinations,

      onFormSubmit: this.#formSubmitHandler,
      onFormReset: this.#formResetHandler,
      onDeleteClick: this.#deleteRoutePointHandler
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
      this.#routePointEditComponent.reset(this.#routePoint);
      this.#replaceEditFormToRoutePoint();
    }
  }

  destroyRoutePoint() {
    remove(this.#routePointComponent);
    remove(this.#routePointEditComponent);
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
    if (isCurrentKeyEscape(evt)) {
      evt.preventDefault();
      this.#routePointEditComponent.reset(this.#routePoint);
      this.#replaceEditFormToRoutePoint();
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
    }
  };

  #editClickHandler = () => {
    this.#replaceRoutePointToEditForm();
  };

  #favoriteClickHandler = () => {
    this.#handleRoutePointContentChange(UserActionTypes.UPDATE_EVENT, ActionTypes.PATCH, {
      ...this.#routePoint,
      isFavorite: !this.#routePoint.isFavorite
    });
  };

  #deleteRoutePointHandler = (routePoint) => {
    this.#handleRoutePointContentChange(UserActionTypes.DELETE_EVENT, ActionTypes.MAJOR, routePoint);
  };

  #formSubmitHandler = (routePoint) => {
    this.#handleRoutePointContentChange(UserActionTypes.UPDATE_EVENT, ActionTypes.PATCH, routePoint);
    this.#replaceEditFormToRoutePoint();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  };

  #formResetHandler = () => {
    this.#routePointEditComponent.reset(this.#routePoint);
    this.#replaceEditFormToRoutePoint();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  };
}
