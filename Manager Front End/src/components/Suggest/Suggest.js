import React from 'react';
import axios from 'axios';
import "./style/Suggest.scss"; 
import Spinner from '../Spinner/Spinner.js';


class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            isFetching: true,
            acceptingWordIndex: null,
            notification: null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3100/suggestion", {withCredentials: true})
        .then(
            (response) => {
                this.setState({
                    words: response.data.data,
                    isFetching: false
                })
            }
        )
    }

    removeFromWords = (index) => {
        this.state.words.splice(index, 1);
    }

    acceptSuggestion = (index) => {
        const word = this.state.words[index];
        axios.put("http://localhost:3100/suggestion", {english: word.english, persian: word.persian}, {withCredentials: true})
        .then(
            (response) => {
                const {status} = response.data;
                if (status === 200) {
                    this.removeFromWords(index);
                }
                this.setState({
                    acceptingWordIndex: null,
                    notification: status === 200 ? null : {
                        index: index,
                        message: "مشکلی در ارتباط با سرور پیش آمد!"
                    }
                })
            }
        )
        this.setState({
            acceptingWordIndex: index
        })
    }

    deleteSuggestion = (index) => {
        const word = this.state.words[index];
        axios.delete(`http://localhost:3100/suggestion?word=${word.english}`, {withCredentials: true})
        .then(
            (response) => {
                const {status} = response.data;
                if (status === 200) {
                    this.removeFromWords(index);
                }
                this.setState({
                    acceptingWordIndex: null,
                    notification: status === 200 ? null : {
                        index: index,
                        message: "مشکلی در ارتباط با سرور پیش آمد!"
                    }
                })
            }
        )
        this.setState({
            acceptingWordIndex: index
        })
    }

    renderSubmittingSpinner = (index) => {
        if (index === this.state.acceptingWordIndex) {
            return <Spinner />;
        }
    }

    renderNotification = (index) => {
        const {notification} = this.state; 
        if (notification && notification.index === index) {
            return (
                <div className="notification">
                    {notification.message}
                </div>
            )
        } 
    }

    renderWords = () => {
        if (!this.state.isFetching) {
            const {words} = this.state;
            if (words.length > 0) {
                return words.map(
                    (elem, index) => {
                        return (
                            <>
                                <div className="word">
                                    <div className="word-info">
                                        <div className="info">
                                            <div className="english">
                                            - واژه درخواست شده:{elem.english}
                                            </div>
                                            <div className="persian">
                                            - ترجمه واژه درخواست شده:{elem.persian}
                                            </div>
                                            <div className="email">
                                            - پیشنهاد از:{elem.email}
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <button onClick={() => this.acceptSuggestion(index)} type="button" className="btn btn-outline-success">پذیرفتن</button>
                                            <button onClick={() => this.deleteSuggestion(index)} type="button" className="btn btn-outline-danger">حذف</button>
                                        </div>
                                    </div>
                                    {this.renderSubmittingSpinner(index)}
                                    {this.renderNotification(index)}
                                </div>
                                <hr />
                            </>
                        )
                    }
                ) 
            }
            else {
                return "موردی برای نمایش وجود ندارد!";
            }
        }
    }

    renderSpinner = () => {
        if (this.state.isFetching) {
            return <Spinner />;
        }
    }

    render() {
        return (
            <div className="suggest">
                <div className="title">
                    واژه های درخواست شده
                </div>
                <div className="words">
                    {this.renderWords()}
                    {this.renderSpinner()}
                </div>
            </div>
        )
    }
}

export default Suggest;