import {HttpMethods} from '../const.js';
import ApiService from '../framework/api-service.js';


export default class EventApiService extends ApiService {

  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get cityDestinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async addEvent(point) {
    const response = await this._load({
      url: 'points',
      method: HttpMethods.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async deleteEvent(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: HttpMethods.DELETE,
    });
  }

  async updateEvent(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: HttpMethods.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.price,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite
    };

    delete adaptedPoint.price;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
