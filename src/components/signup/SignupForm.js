import React, { Component } from 'react'
import userActions from '../../actions/userActions'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './SignupForm.css'

class SignupForm extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        role: ['pm'],
        submitted: false
    }

    handleSubmit = () => {
        this.props.dispatch(userActions.signup(this.state.username, this.state.password, this.state.email, this.state.role))
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { password, submitted } = this.state;

        return (
            <div id="signup-form">
                <div>
                    <h1 id="signup-big-word">Signup</h1>
                </div>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="username" className="signup-titles">Username</label>
                        <input
                            type="text"
                            className="form-control login-form-control"
                            name="username"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="signup-titles">Email</label>
                        <input
                            type="text"
                            className="form-control signup-form-control"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password" className="signup-titles">Password</label>
                        <input
                            type="password"
                            className="form-control signup-form-control"
                            name="password"
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" id="login-button" onClick={this.handleSubmit}>Sign Up</button>
                    </div>
                    <div>
                        <Link to="/login">Go Back to Login</Link>
                        {this.props.message ? <p>{this.props.message}</p> : null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.auth.message) {
        return {
            message: state.auth.message.response ? state.auth.message.response.data : null
        }
    } else {
        return {
            message: null
        }
    }
}

export default connect(mapStateToProps)(SignupForm);