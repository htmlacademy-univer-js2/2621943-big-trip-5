import {RenderPosition, remove, render} from '../framework/render.js';
import {ActionTypes, UserActionTypes} from '../const.js';
import FormCreationView from '../view/form-creation-view.js';


export default class NewRoutePointPresenter {
  #routePoint = null;
  #offers = null;
  #cityDestinations = null;
  #handleRoutePointContentChange = null;
  #handleFormReset = null;
  #formComponent = null;

  constructor({routePointContainer, offers, cityDestinations, contentChange, onFormReset}) {
    this.#routePoint = routePointContainer;
    this.#offers = offers;
    this.#cityDestinations = cityDestinations;
    this.#handleRoutePointContentChange = contentChange;
    this.#handleFormReset = onFormReset;
  }

  init() {
    this.#formComponent = new FormCreationView({
      offers: this.#offers,
      cityDestinations: this.#cityDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#closeForm,
    });
    render(this.#formComponent, this.#routePoint, RenderPosition.AFTERBEGIN);
  }

  #handleFormSubmit = (routePoint) => {
    this.#handleRoutePointContentChange(UserActionTypes.ADD_EVENT, ActionTypes.MAJOR, routePoint);
  };

  #closeForm = () => {
    remove(this.#formComponent);
    this.#handleFormReset();
  };

  setServerSaving() {
    this.#formComponent.updateElement({
      isServerSaving: true
    });
  }

  setServerAborting() {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isServerSaving: false
      });
    };
    this.#formComponent.shake(resetFormState);
  }

  destroy() {
    this.#closeForm();
  }
}
