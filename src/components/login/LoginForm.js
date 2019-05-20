import React, { Component } from 'react'
import userActions from "../../actions/userActions";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './LoginForm.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
    }

    state = {
        username: '',
        password: '',
        submitted: false
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }
 
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div id="login-form">
                <div>
                    <h1 id="login-big-word">Login</h1>
                </div>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username" className="login-titles">Username</label>
                        <input type="text" className="form-control login-form-control" name="username" value={username} onChange={(e) => this.handleChange(e)} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password" className="login-titles">Password</label>
                        <input type="password" className="form-control login-form-control" name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" id="login-button">Login</button>
                        {loggingIn}
                    </div>
                    <Link to="/signup"><button id="signup-button" className="btn btn-primary" >I'm new</button></Link>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.auth;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(LoginForm);
