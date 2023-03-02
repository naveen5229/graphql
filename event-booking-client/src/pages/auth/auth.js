import React, { Component } from "react";
import AuthContext from "../../context/auth.context";
import apiService from "../../service/apiService";
import './auth.css';

class AuthPage extends Component {
    state = {
        isLogin: false
    }

    static contextType = AuthContext;

    constructor(prop) {
        super(prop);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    handleLoginSignup = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin
            }
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault()
        const email = this.emailEl.current.value;
        const passowrd = this.passwordEl.current.value;
        if (email?.trim().length === 0 || passowrd?.trim().length === 0) {
            return;
        }

        let payload = {
            query: `mutation {createUser(userDetail: {email: "${email}", password: "${passowrd}"}){_id email}}`
        }

        if (this.state.isLogin) {
            payload = {
                query: `
                query {
                    login(email: "${email}", password: "${passowrd}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
                `
            }
        }

        apiService({query: payload}).then(res => {
            if (res.data.login.token) {
                this.context.login(res.data.login.token, res.data.login.userId, res.data.login.tokenExpiration)
            };
        });
    }

    render() {
        return <form className="login-form" onSubmit={this.formSubmitHandler}>
            <div>
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" ref={this.emailEl} />
            </div>
            <div>
                <label htmlFor="passowrd">Password</label>
                <input className="form-control" type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-action">
                <button type="submit">{this.state.isLogin ? 'Login' : 'Signup'}</button>
                <button type="button" onClick={this.handleLoginSignup}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>
    }
}

export default AuthPage;