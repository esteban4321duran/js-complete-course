'use strict';

class App {
  #map;
  #lastMapEvent;
  #workouts = [];
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
    //Get user's position
    this._getPosition();

    //get local storage
    this._getLocalStorage();

    //Attach event handlers
    form.addEventListener('submit', this._handleSubmit.bind(this));
    inputType.addEventListener(
      'change',
      this._toggleCadenceElevation.bind(this)
    );
    window.addEventListener('keydown', this._handleFormCancel.bind(this));
    containerWorkouts.addEventListener(
      'click',
      this._handleWorkoutClick.bind(this)
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
    //Render marker once the map has finished loading
    this.#workouts.forEach(workout => {
      this._renderMarker(workout);
    });
  }
  _handleMapClick(mapEvent) {
    this.#lastMapEvent = mapEvent;
    // console.log(mapEvent.latlng);
    this._showForm();
  }
  _showForm() {
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    this._clearForm();
    //smooth form hiding
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _clearForm() {
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value =
      '';
  }
  _toggleCadenceElevation = function () {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  };
  _handleSubmit(formEvent) {
    formEvent.preventDefault();
    //get data from form
    const formData = this._getFormData();
    //check if data is valid
    if (this._checkFormData(formData) !== 'valid') {
      alert('Invalid input');
      return;
    }
    //if type is running, create running object
    //else, create cycling object
    const workout = this._newWorkout(formData);
    //add new object to workout array

    this.#workouts.push(workout);
    //render workout as marker
    this._renderMarker(workout);
    //render workout on list
    this._renderWorkout(workout);
    //hide form + clear input fields
    this._hideForm();
    //store all workouts in local storage
    this._setLocalStorage();
  }

  _getFormData() {
    const formData = {
      type: inputType.value,
      distance: +inputDistance.value,
      duration: +inputDuration.value,
      coords: this.#lastMapEvent.latlng,
    };
    if (formData.type === 'running')
      formData.cadence = Number(inputCadence.value);
    if (formData.type === 'cycling')
      formData.elevation = Number(inputElevation.value);
    return formData;
  }
  _checkFormData(data) {
    //helper functions. only used here
    const testForNumbers = (...inputs) => {
      return inputs.every(input => Number.isFinite(input));
    };
    const testForPositives = (...inputs) => {
      return inputs.every(input => input > 0);
    };

    if (data.type === 'running')
      if (
        !testForNumbers(data.distance, data.duration, data.cadence) ||
        !testForPositives(data.distance, data.duration, data.cadence)
      ) {
        return 'invalid';
      }

    if (data.type === 'cycling')
      if (
        !testForNumbers(data.distance, data.duration, data.elevation) ||
        !testForPositives(data.distance, data.duration)
      ) {
        return 'invalid';
      }
    return 'valid';
  }
  _newWorkout(data) {
    if (data.type === 'running')
      return new Running(
        data.coords,
        data.distance,
        data.duration,
        data.cadence
      );
    if (data.type === 'cycling')
      return new Cycling(
        data.coords,
        data.distance,
        data.duration,
        data.elevation
      );
  }
  _renderMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup(
          workout.type === 'running'
            ? this.#runningPopUpOptions
            : this.#cyclingPopUpOptions
        )
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚴‍'} ${workout.description}`
      ) //TODO generate popup content
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃' : '🚴‍'
        }‍</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;
    if (workout.type === 'running')
      html += `
          <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">km/min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">👟</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
    if (workout.type === 'cycling')
      html += `
          <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
    form.insertAdjacentHTML('afterEnd', html);
  }
  _handleWorkoutClick(clickEvent) {
    const workoutElement = clickEvent.target.closest('.workout');
    if (!workoutElement) return;
    const workoutMarker = this.#workouts.find(
      workout => workout.id === workoutElement.dataset.id
    );
    this.#map.setView(workoutMarker.coords, this.#defaultMapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  _handleFormCancel(keyEvent) {
    if (keyEvent.key !== 'Escape') return;

    this._hideForm();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;
    //restore workouts data
    this.#workouts = data;

    //Render workouts and markers when the map has finished loading
    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}
/////////////////////////////////////////////////////////////

const app = new App();
