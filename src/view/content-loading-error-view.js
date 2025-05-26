import AbstractView from '../framework/view/abstract-view';

function createContentLoadingErrorTemplate() {
  return (
    '<p class="trip-events__msg">Failed to load latest route information</p>'
  );
}

export default class ContentLoadingErrorView extends AbstractView {

  get template() {
    return createContentLoadingErrorTemplate();
  }
}
