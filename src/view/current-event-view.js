import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, findDuration} from '../utils.js';
import {DateTypes} from '../const.js';

function createCurrentEventTemplate(event, allOffers, cityDestinations) {
  const {price, dateFrom, dateTo, cityDestination, isFavorite, offers, type} = event;
  const eventTypeOffers = allOffers.find((offer) => offer.type === type);
  const cityDestinationDescription = cityDestinations.find((destination) => destination.id === cityDestination);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${formatDate(dateFrom, DateTypes.MONTH)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${cityDestinationDescription.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${formatDate(dateFrom, DateTypes.TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${formatDate(dateTo, DateTypes.TIME)}</time>
                  </p>
                  <p class="event__duration">${findDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${eventTypeOffers.offers.map((offer) => {
    if (offers.includes(offer.id)) {
      return (`<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>`);
    }
  }).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class CurrentEventView extends AbstractView {
  #routePoint = null;
  #offers = null;
  #cityDestinations = null;
  #editClick = null;
  #favoriteClick = null;

  constructor({routePoint, offers, cityDestinations, onEditClick, onFavoriteClick}) {
    super();
    this.#routePoint = routePoint;
    this.#offers = offers;
    this.#cityDestinations = cityDestinations;
    this.#editClick = onEditClick;
    this.#favoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createCurrentEventTemplate(this.#routePoint, this.#offers, this.#cityDestinations);
  }

  #editClickHandler = () => {
    this.#editClick();
  };

  #favoriteClickHandler = () => {
    this.#favoriteClick();
  };
}
