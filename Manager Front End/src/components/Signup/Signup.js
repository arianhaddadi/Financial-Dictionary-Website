import React from 'react';
import Login from '../Login/Login';
import axios from 'axios';


class Signup extends Login {

    signup = () => {
        const {username, password} = this.state;
        if (username === "" || password === "") {
            this.setState({
                notification: "لطفا هر دو فیلد را پر کنید."
            })
        }
        else {
            axios.post("http://localhost:3100/users/signup", {username: username, password: password}).then(
                (response) => {
                    const {data} = response;
                    if (data.status === 200) {
                        this.setState({
                            isSubmitting: false,
                            notification: {
                                message:"ثبت نام با موفقیت انجام شد.",
                                error: false
                            }
                        });
                        setTimeout(() => {
                            this.props.history.push("/login");
                        }, 3000);
                    }
                    else if (data.status === 409) {
                        this.setState({
                            isSubmitting: false,
                            notification: {
                                message: "کاربر با نام کاربری یکسان از قبل وجود دارد.",
                                error: true
                            }
                        });
                    }
                    else {
                        this.setState({
                            isSubmitting: false,
                            notification: {
                                message: "ثبت نام با شکست مواجه شد.",
                                error: true
                            }
                        });
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
            this.signup();
        }
    }

    render() {
        return (
            <div className="login-signup-divs">
                <div className="title">
                    ثبت نام
                </div>
                <div className="login-signup-div">
                    <input autoComplete="off" className="btn login-signup-input-box" id="login-signup-username-box" value={this.state.username} onChange={(event) => this.handleInputValueChange("username", event)} onKeyPress={this.handleSubmit} type="text" placeholder="Username" />
                    <label htmlFor="login-signup-username-box">:نام کاربری</label>
                    
                </div>
                <div className="login-signup-div">
                    <input autoComplete="off" className="btn login-signup-input-box" id="login-signup-password-box" value={this.state.password} onChange={(event) => this.handleInputValueChange("password", event)} onKeyPress={this.handleSubmit} type="password" placeholder="Password" />
                    <label htmlFor="login-signup-password-box">:کلمه عبور</label>
                </div>
                <button className="btn btn-primary login-signup-submit" onClick={this.signup}>ثبت نام</button>
                {this.renderNotification()}
                {this.renderSpinner()}
            </div>
        );
    }
}

export default Signup;