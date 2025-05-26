import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {DateTypes, ROUTE_POINT_TYPES} from '../const.js';

const EMPTY_ROUTE_POINT = {
  price: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'taxi'
};

function createRoutePointTypesTemplate(type) {
  return (
    ROUTE_POINT_TYPES.map((eventType) => (
      `<div class="event__type-item">
        <input
          id="event-type-${eventType}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${eventType}"
          ${eventType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
      </div>`
    )).join('')
  );
}

function createChoosingOfferTemplate(routePointOffers, offers) {
  return (
    routePointOffers.offers.map((offer) => (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.title}-${offer.id}"
          type="checkbox"
          name="event-offer-${offer.title}"
          data-id="${offer.id}"
          ${offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    )
    ).join('')
  );
}

function createAvailableOffersTemplateTemplate(allOffers, checkedOffers, type) {
  const routePointOffers = allOffers.find((offer) => offer.type === type);
  if (routePointOffers.length === 0) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createChoosingOfferTemplate(routePointOffers, checkedOffers)}
        </div>
    </section>`
  );
}

function createChoosingDestinationTemplate(cityDestination) {
  if (!cityDestination) {
    return '';
  }
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${cityDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${cityDestination.pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
        </div>
      </div>
    </section>`
  );
}

function createRoutePointCreationFormTemplate(routePoint, allOffers, cityDestinations) {
  const {price, dateFrom, dateTo, destination, offers, type} = routePoint;

  const currentDestination = cityDestinations.find((item) => item.id === destination);

  const renderCityDestinations = cityDestinations.map((cityDestination) => `<option value="${cityDestination.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createRoutePointTypesTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination ? he.encode(currentDestination.name) : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${renderCityDestinations}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

        </header>
        <section class="event__details">
          ${createAvailableOffersTemplateTemplate(allOffers, offers, type)}

          ${createChoosingDestinationTemplate(currentDestination)}
        </section>
      </form>
    </li>`
  );
}

export default class FormCreationView extends AbstractStatefulView {
  #offers = null;
  #cityDestinations = null;
  #formSubmit = null;
  #formReset = null;
  #dateFrom = null;
  #dateTo = null;

  constructor({offers, cityDestinations, onFormSubmit, onFormReset}) {
    super();
    this._setState(EMPTY_ROUTE_POINT);
    this.#offers = offers;
    this.#cityDestinations = cityDestinations;
    this.#formSubmit = onFormSubmit;
    this.#formReset = onFormReset;

    this._restoreHandlers();
  }

  get template() {
    return createRoutePointCreationFormTemplate(this._state, this.#offers, this.#cityDestinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFrom) {
      this.#dateFrom.destroy();
      this.#dateFrom = null;
    }
    if (this.#dateTo) {
      this.#dateTo.destroy();
      this.#dateTo = null;
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#formSubmit(this._state);
  };

  #formResetHandler = () => {
    this.#formReset();
  };

  #chosenRoutePointTypeHandler = (evt) => {
    if (evt.target.closest('input')) {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };

  #chosenOffersHandler = (evt) => {
    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, parseInt(evt.target.dataset.id, 10)]
      });
    }
  };

  #chosenCityDestinationHandler = (evt) => {
    const newCityDestination = this.#cityDestinations.find((cityDestination) => cityDestination.name === evt.target.value);
    this.updateElement({
      cityDestination: newCityDestination.id
    });
  };

  #chosenPriceHandler = (evt) => {
    this._setState({
      price: evt.target.value
    });
  };

  #chosenDateFromHandler = ([chosenDate]) => {
    this.updateElement({
      dateFrom: chosenDate
    });
  };

  #chosenDateToHandler = ([chosenDate]) => {
    this.updateElement({
      dateTo: chosenDate
    });
  };

  #setDates() {
    this.#dateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateTypes.DATE,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom || 'today',
        maxDate: this._state.dateTo,
        onChange: this.#chosenDateFromHandler
      },
    );
    this.#dateTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateTypes.DATE,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo || '',
        minDate: this._state.dateFrom,
        onChange: this.#chosenDateToHandler
      },
    );
  }

  reset(routePoint) {
    this.updateElement(routePoint);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#chosenRoutePointTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#chosenOffersHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#chosenCityDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#chosenPriceHandler);
    this.#setDates();
  }
}
