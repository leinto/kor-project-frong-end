import { userConstants } from "../constants/userConstants";
import userServices from "../services/userServices";
import alertActions from "../actions/alertActions";
import history from "../utilities/history"

function login(username, password) {
    const request = user => { return { type: userConstants.LOGIN_REQUEST, user } }
    const success = user => { return { type: userConstants.LOGIN_SUCCESS, user } }
    const failure = error => { return { type: userConstants.LOGIN_FAILURE, error } }

    return dispatch => {
        dispatch(request({ username }))

        userServices.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/')
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }

}

function logout() {
    userServices.logout();
    return { type: userConstants.LOGOUT };
}

const signup = (username, password, email, role) => {
    const success = message => { return { type: userConstants.SIGN_UP_SUCCESS, message } }
    const failure = error => { return { type: userConstants.SIGN_UP_FAILURE, error } }
    return dispatch => {
        userServices.signup(username, password, email, role)
            .then(message => {
                dispatch(success(message)) 
                history.push('/login')
            })
            .catch(error => { dispatch(failure(error)) })
    }
}


export default {
    login,
    logout,
    signup
}