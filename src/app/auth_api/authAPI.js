import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

class AuthService {
    async login(email, password) {
        const response = await axios
            .post(API_URL + "token/obtain/", { email, password });
        if (response.data.access) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();