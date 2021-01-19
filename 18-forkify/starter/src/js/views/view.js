import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement;
  _data;
  _render() {
    const markup = this._generateMarkup(this._data);
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }
  _generateMarkup() {} //override
  //public API
  updateAndRender(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      //check if there was no data for the requested query
      this.renderError();
      return;
    }
    this._data = data;
    this._render();
  }
  renderSpiner() {
    const markup = `
		<div class="spinner">
			<svg>
				<use href="${icons}#icon-loader"></use>
			</svg>
		</div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError() {} //override
}
