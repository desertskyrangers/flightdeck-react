class ApiPath {

	ROOT = "/api"

	AUTH = this.ROOT + "/auth"

	USER = this.ROOT + "/user"

	USER_AIRCRAFT = this.USER + "/aircraft"
}

const instance = new ApiPath()
Object.freeze(instance)
export default instance
