'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class App {
  #map;
  #lastMapEvent;

  #defaultMapZoom = 14;
  #runningPopUpOptions = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  };
  #cyclingPopUpOptions = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'cycling-popup',
  };

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener(
      'change',
      this._toggleCadenceElevation.bind(this)
    );
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could Not get your position');
        }
      );
    } else {
      alert(`Your navigator doesn't support geolocation`);
    }
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    this._initMap(latitude, longitude);
  }
  _initMap(...coords) {
    this.#map = L.map('map').setView(coords, this.#defaultMapZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._handleMapClick.bind(this));
  }
  _handleMapClick(mapEvent) {
    this.#lastMapEvent = mapEvent;
    this._showForm();
  }
  _showForm() {
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    this._clearForm();
    form.classList.add('hidden');
  }
  _clearForm() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
  }
  _toggleCadenceElevation = function () {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  };
  _newWorkout(formEvent) {
    formEvent.preventDefault();
    const { lat, lng } = this.#lastMapEvent.latlng;
    this._hideForm();
    this._renderMarker('Workout', this.#runningPopUpOptions, lat, lng);
  }
  _renderMarker(popupContent, popupOptions, ...coords) {
    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(popupContent)
      .openPopup();
  }
}

const app = new App();
