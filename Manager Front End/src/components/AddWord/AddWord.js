import React from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import "./styles/AddWord.scss";


class AddWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            notification: null,
            english: "",
            persian: "",
            synonym: "",
            antonym: "",
            reference:""
        }
    }

    renderSpinner = () => {
        if (this.state.isSubmitting) {
            return <Spinner />
        }
    }

    handleInputChange = (event, stateProp) => {
        this.setState({
            [stateProp]: event.target.value
        })
    }

    renderInput = (lang, isTextArea, label, stateProp) => {
        return (
            <div className="input">
                <label htmlFor={`search-box ${stateProp}`}>
                    {label}
                </label>
                {isTextArea ? 
                    <textarea className={`form-control input-box ${lang}`} 
                    id={`search-box ${stateProp}`} 
                    type="text" 
                    value={this.state[stateProp]}
                    onChange={(event) => this.handleInputChange(event, stateProp)}
                    /> :
                    <input className={`form-control input-box ${lang}`} 
                    id={`search-box ${stateProp}`} 
                    type="text" 
                    value={this.state[stateProp]}
                    onChange={(event) => this.handleInputChange(event, stateProp)}
                    />
                }   
            </div>
        )
    }

    renderNotification = () => {
        const {notification} = this.state;
        if (notification !== null) {
            return (
                <div className={`notification ${notification.success ? "success" : "error"}`}>
                    {notification.message}
                </div>
            )
        }
    }

    formPersianMeaning = () => {
        let meaning = this.state.persian;
        if (this.state.synonym !== "") meaning += ` مترادف ${this.state.synonym}`;
        if (this.state.antonym !== "") meaning += ` متضاد ${this.state.antonym}`;
        if (this.state.reference !== "") meaning += ` ← ${this.state.reference}`;
        return meaning;
    }

    addWord = () => {
        const persian = this.formPersianMeaning();
        if (this.state.english !== "" && this.state.persian !== "") {
            axios.post("http://localhost:3100/add", {english:this.state.english, persian:persian}, {withCredentials: true}).then(
                respone => {
                    this.setState({
                        isSubmitting: false,
                        notification: respone.data.status === 200 ? {
                            message: "لغت مورد نظر با موفقیت افزوده شد!",
                            success: true
                        } : {
                            message: "عملیات با شکست مواجه شد!ممکن است لغتی با ویژگی های مشابه از قبل موجود باشد",
                            success: false
                        }
                    })
                }
            )
            this.setState({
                isSubmitting: true,
                notification: null
            })
        }
        else {
            this.setState({
                notification:{
                    success: false,
                    message: "لطفا هر دو ورودی را پر کنید!"
                }
            })
        }
    }

    render() {
        return (
            <div className="add-word">
                <div className="header">
                    افزودن کلمه
                </div>
                <div className="inputs">
                    {this.renderInput("en-me", true, "انگلیسی", "english")}
                    {this.renderInput("fa-me", true, "فارسی", "persian")}
                    {this.renderInput("en-me", false, "مترادف", "synonym")}
                    {this.renderInput("en-me", false, "متضاد", "antonym")}
                    {this.renderInput("en-me", false, "ارجاع", "reference")}
                </div>
                <div className="buttons">
                    <button onClick={this.addWord} type="button" className="btn btn-primary edit-button">افزودن</button>
                </div>
                {this.renderSpinner()}
                {this.renderNotification()}
            </div>
        )
    }
}


export default AddWord;