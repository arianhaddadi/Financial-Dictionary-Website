import React from 'react';
import axios from 'axios';
import "./style/Suggest.scss"; 
import Spinner from '../Spinner/Spinner';


class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            notification: null,
            english: "",
            email: "",
            persian: ""
        }
    }

    renderMessage = () => {
        return `
        چنانچه واژه ی مورد نظر شما در پایگاه داده موجود نیست،
         از طریق فرم زیر واژه ی مورد نظر را ارسال نمایید تا پس از بررسی های لازم،
         معادل فارسی به همراه اصطلاح انگلیسی آن در پایگاه داده قرار گیرد.
        `;
    }

    submitSuggestion = () => {
        const {english, persian, email} = this.state;
        if (english === "" || email === "" || persian === "") {
            this.setState({
                notification: {
                    success: false,
                    message: "لطفا هر دو ورودی را وارد کنید!"
                }
            })
        }
        else {
            axios.post(`https://stellardictserver.herokuapp.com/suggestion`, {english: english, email: email, persian: persian})
            .then((response) => {
                if (response.data.status === 200) {
                    this.setState({
                        isSubmitting: false,
                        notification: {
                            message: "لغت پیشنهادی شما با موفقیت ثبت شد.",
                            success: true
                        },
                        english: "",
                        persian: "",
                        email: ""
                    })
                }
                else {
                    this.setState({
                        isSubmitting: false,
                        notification: {
                            message: "خطایی رخ داد! ممکن است لغت پیشنهادی شما از قبل موجود باشد یا از قبل پیشنهاد شده باشد!",
                            success: false,
                        },
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isSubmitting: false,
                    notification: {
                        message: "خطایی رخ داد! ممکن است لغت پیشنهادی شما از قبل موجود باشد یا از قبل پیشنهاد شده باشد!",
                        success: false
                    }
                })
            })
            this.setState({
                isSubmitting: true,
                notification: null
            })
        }
    }

    renderNotification = () => {
        const {notification} = this.state;
        if (notification) {
            return (
                <div className={`notification ${notification.success ? "success" : "error"}`}>
                    {notification.message}
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
            <div className="suggest">
                <div className="title">
                    درخواست معنی
                </div>
                <div className="message">
                    {this.renderMessage()}
                </div>
                <div className="inputs">
                    <div className="word">
                        <label htmlFor="word">انگلیسی واژه مورد نظر را وارد کنید</label>
                        <input onChange={(event) => this.setState({english: event.target.value})} value={this.state.english} autoComplete="off" className="btn contact-input" id="word" type="text" name="word" />
                    </div>
                    <div className="persian">
                        <label htmlFor="email">ترجمه واژه مورد نظر را وارد کنید</label>
                        <input onChange={(event) => this.setState({persian: event.target.value})} value={this.state.persian} autoComplete="off" className="btn contact-input" id="email" type="text" name="email" />
                    </div>
                    <div className="email">
                        <label htmlFor="email">ایمیل</label>
                        <input onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} autoComplete="off" className="btn contact-input" id="email" type="text" name="email" />
                    </div>
                    <button onClick={this.submitSuggestion} type="submit" className="btn btn-primary">
                        ارسال
                    </button>
                </div>
                {this.renderNotification()}
                {this.renderSpinner()}
            </div>
        )
    }
}

export default Suggest;