import ApiService from "./ApiService";
import Config from "../AppConfig";

export class UserService extends ApiService {

	profile(id, successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/profile`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}


const instance = new UserService()
Object.freeze(instance)
export default instance
