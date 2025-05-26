import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import EventModel from './model/event-model.js';
import OfferModel from './model/offer-model.js';
import FilterModel from './model/filter-model.js';
import CityDestinationModel from './model/city-destination-model.js';

import EventApiService from './service/event-api-service.js';
import {AUTHORIZATION, SERVER_ADDRESS} from './const.js';

const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const eventApiService = new EventApiService(SERVER_ADDRESS, AUTHORIZATION);

const offerModel = new OfferModel({eventApiService});
const cityDestinationModel = new CityDestinationModel({eventApiService});
const eventModel = new EventModel({eventApiService, offerModel, cityDestinationModel});
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(eventsContainer, headerContainer, eventModel, offerModel, cityDestinationModel, filterModel);
const headerPresenter = new HeaderPresenter(headerContainer, eventModel, cityDestinationModel);
const filterPresenter = new FilterPresenter(eventModel, filterModel, filterContainer);

eventModel.init();
mainPresenter.init();
headerPresenter.init();
filterPresenter.init();
