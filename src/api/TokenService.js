import decode from "jwt-decode";

const TOKEN_KEY = 'jwt_token';

class TokenService {

	isAuthenticated() {
		// Check if there is a saved token, and that it is still valid
		const token = this.getToken();
		return token !== 'undefined' && !!token && !this.isTokenExpired(token);
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			return decoded.exp < Date.now() / 1000;
		} catch (err) {
			return false;
		}
	}

	setToken(token) {
		localStorage.setItem(TOKEN_KEY, token)
	}

	getToken() {
		// Retrieves the user token from localStorage
		return localStorage.getItem(TOKEN_KEY);
	}

	expire() {
		localStorage.removeItem(TOKEN_KEY);
	}

	getUserId() {
		return decode(this.getToken()).uid;
	}

}

const instance = new TokenService();
Object.freeze(instance);
export default instance;
