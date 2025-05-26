import AbstractView from '../framework/view/abstract-view';
import {formatDate} from '../utils.js';
import {DateTypes} from '../const.js';

const CITY_DESTINATIONS_FOR_RENDER = 4;

function createHeaderTemplate({price, cityDestinations, routePoints}) {
  const currentCityDestinations = Array.from(new Set(cityDestinations));
  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${currentCityDestinations.length > CITY_DESTINATIONS_FOR_RENDER ? `${currentCityDestinations[0]} &mdash;...&mdash; ${currentCityDestinations[currentCityDestinations.length - 1]}` : currentCityDestinations.join(' &mdash; ')}</h1>
         <p class="trip-info__dates">${formatDate(routePoints[0].dateFrom, DateTypes.MONTH)}&nbsp;&mdash;&nbsp;${formatDate(routePoints[routePoints.length - 1].dateTo, DateTypes.MONTH)}</p>
       </div>
       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
       </p>
     </section>`
  );
}

export default class HeaderView extends AbstractView {
  #routePoints = null;
  #cityDestinations = null;

  constructor({routePoints, cityDestinations}) {
    super();
    this.#routePoints = routePoints;
    this.#cityDestinations = cityDestinations;
  }

  get template() {
    return createHeaderTemplate({
      price: this.#calculatePrice(),
      cityDestinations: this.#getCityDestinations(),
      routePoints: this.#routePoints
    });
  }

  #calculatePrice() {
    return this.#routePoints.reduce((total, routePoint) => total + parseInt(routePoint.price, 10), 0);
  }

  #getCityDestinations() {
    return this.#routePoints.map((routePoint) => this.#cityDestinations.find((destination) => destination.id === routePoint.cityDestination).name);
  }
}
