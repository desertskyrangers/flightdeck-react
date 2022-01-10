import decode from "jwt-decode";

const TOKEN_KEY = 'jwt-token';

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

	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	}

	setToken(token) {
		localStorage.setItem(TOKEN_KEY, token)
	}

	expire() {
		localStorage.removeItem(TOKEN_KEY);
	}

	getUserId() {
		try {
			return decode(this.getToken()).uid;
		} catch (error) {
			console.log(error.message);
			return '';
		}
	}

}

const instance = new TokenService();
Object.freeze(instance);
export default instance;
