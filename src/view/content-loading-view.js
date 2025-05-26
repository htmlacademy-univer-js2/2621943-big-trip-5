import AbstractView from '../framework/view/abstract-view';

function createContentLoadingTemplate() {
  return (
    '<p class="trip-events__msg">Loading...</p>'
  );
}

export default class ContentLoadingView extends AbstractView {

  get template() {
    return createContentLoadingTemplate();
  }
}
