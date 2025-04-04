import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import EventModel from './model/event-model.js';


const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const eventModel = new EventModel();

const headerPresenter = new HeaderPresenter(headerContainer, eventModel);
const mainPresenter = new MainPresenter(eventsContainer, filterContainer, eventModel);

headerPresenter.init();
mainPresenter.init();
