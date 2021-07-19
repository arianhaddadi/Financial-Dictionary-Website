import React from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

import "./style/login.scss";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password: "",
            isSubmitting: false,
            notification: null
        }
    }


    handleInputValueChange = (field, event) => {
        this.setState({
            [field]: event.target.value
        })
    }

    login = () => {
        const {username, password} = this.state;
        if (username === "" || password === "") {
            this.setState({
                notification: {
                    message: "لطفا هر دو فیلد را پر کنید.",
                    error: true
                }
            })
        }
        else {
            axios.post("http://localhost:3100/users/login", {username: username, password: password}, {withCredentials: true}).then(
                (response) => {
                    const {data} = response;
                    if (data.status === 200) {
                        this.setState({
                            notification: {
                                message: "ورود موفقیت آمیز بود.",
                                error: false
                            },
                            isSubmitting: false
                        })
                        setTimeout(() => {
                            this.props.history.push("/home");
                            window.location.reload();
                        }, 3000);
                    }
                    else {
                        this.setState({
                            notification: {
                                message: "نام کاربری یا کلمه عبور اشتباه است.",
                                error: true
                            },
                            isSubmitting: false
                        })
                    }
                }
            );
            this.setState({
                notification: null,
                isSubmitting: true
            })
        }
    }


    handleSubmit = (event) => {
        if (event.nativeEvent.key === "Enter") {
            this.login();
        }
    }

    renderNotification = () => {
        if (this.state.notification) {
            return (
                <div className={`notification ${this.state.notification.error ? "error" : "success"}`}>
                    {this.state.notification.message}
                </div>
            )
        }
    }

    renderSpinner = () => {
        if (this.state.isSubmitting) {
            return <Spinner />;
        }
    }

    render() {
        return (
            <div className="login-signup-divs">
                <div className="title">
                    ورود به پنل
                </div>
                <div className="login-signup-div">
                    <input autoComplete="off" className="btn login-signup-input-box" id="login-signup-username-box" value={this.state.username} onChange={(event) => this.handleInputValueChange("username", event)} onKeyPress={this.handleSubmit} type="text" placeholder="Username" />
                    <label htmlFor="login-signup-username-box">:نام کاربری</label>
                    
                </div>
                <div className="login-signup-div">
                    <input autoComplete="off" className="btn login-signup-input-box" id="login-signup-password-box" value={this.state.password} onChange={(event) => this.handleInputValueChange("password", event)} onKeyPress={this.handleSubmit} type="password" placeholder="Password" />
                    <label htmlFor="login-signup-password-box">:کلمه عبور</label>
                </div>
                <button className="btn btn-primary login-signup-submit" onClick={this.login}>ورود</button>
                {this.renderNotification()}
                {this.renderSpinner()}
            </div>
        );
    }
}


export default Login;