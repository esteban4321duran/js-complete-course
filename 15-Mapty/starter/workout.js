'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; //latitude, longitude
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _createDescription() {
    // prettier-ignore
    const months = [
			'January','February','March','April','May','June','July','August','September','October','November','December',
		];
    //TODO internationalize this workout description
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._calcPace();
    this._createDescription();
  }

  _calcPace() {
    // km/min
    this.pace = this.distance / this.duration;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this._calcSpeed();
    this._createDescription();
  }

  _calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
  }
}
