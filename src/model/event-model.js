import Observable from '../framework/observable.js';
import {ActionTypes} from '../const.js';

export default class EventModel extends Observable {
  #events = [];
  #offerModel = null;
  #cityDestinationModel = null;
  #eventApiService = null;

  constructor({eventApiService, offerModel, cityDestinationModel}) {
    super();
    this.#eventApiService = eventApiService;
    this.#offerModel = offerModel;
    this.#cityDestinationModel = cityDestinationModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#offerModel.init(),
        this.#cityDestinationModel.init()
      ]);
      const events = await this.#eventApiService.events;
      this.#events = events.map(this.#adaptToClient);
      this._notify(ActionTypes.INIT);

    } catch(error) {
      this.#events = [];
      this._notify(ActionTypes.ERROR);
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      price: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  async add(actionType, newEvent) {
    try {
      const response = await this.#eventApiService.addEvent(newEvent);
      const currentEvent = this.#adaptToClient(response);
      this.#events = [
        currentEvent,
        ...this.#events
      ];
      this._notify(actionType, currentEvent);
    } catch(error) {
      throw new Error('Can\'t add event');
    }
  }

  async update(actionType, updateItem) {
    const index = this.#events.findIndex((event) => event.id === updateItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventApiService.updateEvent(updateItem);
      const editedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        editedEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(actionType, editedEvent);
    } catch(error) {
      throw new Error('Can\'t update event');
    }
  }

  async remove(actionType, eventToRemove) {
    const index = this.#events.findIndex((event) => event.id === eventToRemove.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventApiService.deleteEvent(eventToRemove);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(actionType);
    } catch(error) {
      throw new Error('Can\'t delete event');
    }
  }

  get events() {
    return this.#events;
  }
}
