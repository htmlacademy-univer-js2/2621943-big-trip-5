import {getRandomEvent} from '../mock/event.js';
import Observable from '../framework/observable.js';

const NUMBER_OF_EVENTS = 5;

export default class EventModel extends Observable {
  #events = [];

  constructor() {
    super();
    this.#generateEvents();
  }

  #generateEvents() {
    const usedIds = new Set();

    while (this.#events.length < NUMBER_OF_EVENTS) {
      const newEvent = getRandomEvent();

      if (!usedIds.has(newEvent.id)) {
        usedIds.add(newEvent.id);
        this.#events.push(newEvent);
      }
    }
  }

  add(updateType, newEvent) {
    this.#events = [
      newEvent,
      ...this.#events
    ];

    this._notify(updateType, newEvent);
  }

  update(updateType, eventToUpdate) {
    const index = this.#events.findIndex((event) => event.id === eventToUpdate.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      eventToUpdate,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, eventToUpdate);
  }

  remove(updateType, eventToRemove) {
    const index = this.#events.findIndex((event) => event.id === eventToRemove.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  get events() {
    return this.#events;
  }
}
