import ApiService from "./ApiService";
import Config from "../AppConfig";
import ApiPath from "./ApiPath";

class UserService extends ApiService {

  dashboard(successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/dashboard`, {
      method: 'GET'
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  publicDashboard(id, successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/dashboard/${id}`, {
      method: 'GET'
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  groupDashboards(successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/dashboard`, {
      method: 'GET'
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  profile(successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/profile`, {
      method: 'GET'
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  update(account, successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/user/${account.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: account.id,
        username: account.username,
        firstName: account.firstName,
        lastName: account.lastName,
        preferredName: account.preferredName,
        callSign: account.callSign,
        email: account.email,
        smsNumber: account.smsNumber,
        smsCarrier: account.smsCarrier
      })
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  updatePassword(id, currentPassword, password, successCallback, failureCallback) {
    this.fetch(Config.API_URL + `/api/user/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        currentPassword: currentPassword,
        password: password
      })
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getAircraftPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT + "?filter=available&pg=" + page + "&pz=10", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getUnavailableAircraftPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT + "?filter=unavailable&pg=" + page + "&pz=50", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getBatteryPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_BATTERY + "?filter=available&pg=" + page + "&pz=10", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getUnavailableBatteryPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_BATTERY + "?filter=unavailable&pg=" + page + "&pz=10", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getFlightPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_FLIGHT + "?pg=" + page + "&pz=10", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getGroupPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_GROUP , {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getLocationPage(page, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_LOCATION + "?pg=" + page + "&pz=10", {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getMemberships(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_MEMBERSHIP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getAircraftOptions(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT_LOOKUP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getBatteryOptions(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_BATTERY_LOOKUP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getLocations(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_LOCATION + "?pz=100", {
      method: 'GET',
    }).then((response) => {
      successCallback(response.page.content)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getLocationOptions(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_LOCATION_LOOKUP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getObserverOptions(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_OBSERVER_LOOKUP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getPilotOptions(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_PILOT_LOOKUP, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  getPreferences(successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_PREFERENCES, {
      method: 'GET',
    }).then((response) => {
      successCallback(response)
    }).catch((error) => {
      failureCallback(error)
    })
  }

  setPreferences(userid, preferences, successCallback, failureCallback) {
    this.fetch(Config.API_URL + ApiPath.USER_PREFERENCES, {
      method: 'PUT',
      body: JSON.stringify({
        id: userid,
        preferences: preferences
      })
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
