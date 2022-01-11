class AppConfig {

	HOSTNAME = window && window.location && window.location.hostname
	API_URL = 'https://flightlog.desertskyrangers.org'
	EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
	PHONE_PATTERN = /^[-+.()0-9 ]*$/;

	constructor() {
		if (this.HOSTNAME === 'localhost') this.API_URL = 'http://localhost:8050';

		console.log("HOSTNAME=" + this.HOSTNAME)
		console.log("API_URL=" + this.API_URL)
	}

}

const instance = new AppConfig()
Object.freeze(instance)
export default instance
