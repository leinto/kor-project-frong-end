import axios from "axios";

const apiUrl = `http://localhost:8080/api/auth/`;

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // saber
                // location.reload(true);
                // window.location.reload(true);
            }
 
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
} 

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl}signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}


const logout = () => {
    localStorage.removeItem('user');    
}

const signup = (username, password, email, role) => {
    return axios.post(`http://localhost:8080/api/auth/signup`, {
        username: username,
        password: password,
        email: email,
        role: role
    }).then(res => {
        return res.data})
}

export default {
    login,
    logout, 
    signup
};