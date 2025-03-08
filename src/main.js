import MainPresenter from './presenter/main-presenter.js';
import EventModel from './model/event-model.js';

const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventModel = new EventModel();

const mainPresenter = new MainPresenter(eventsContainer, filterContainer, eventModel);

mainPresenter.init();
