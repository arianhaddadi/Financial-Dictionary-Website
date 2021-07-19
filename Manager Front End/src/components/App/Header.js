import React from 'react';
import axios from 'axios';

class Header extends React.Component {

    prepareLeftSide = () => {
        const {history} = this.props;
        if (history.location.pathname !== "/login" && history.location.pathname !== "/signup") {
            return (
                <>
                    <div onClick={() => history.push("/contact")} className="container-left-side-item">
                        تماس با ما
                    </div>
                    <div onClick={() => history.push("/book")} className="container-left-side-item">
                        درباره کتاب
                    </div>
                    <div onClick={() => history.push("/authors")} className="container-left-side-item">
                        درباره مؤلفان
                    </div>
                </>
            );
        }
    }

    logout = () => {
        axios.post("http://localhost:3100/users/logout", null, {withCredentials: true}).then(
            (response) => {
                console.log(response);
                setTimeout(() => {
                    this.props.history.push("/login");
                    window.location.reload();
                }, 2000);
            }
        )
    }

    prepareRightSide = () => {
        const {history} = this.props;
        if (history.location.pathname !== "/login" && history.location.pathname !== "/signup") {
            return (
                <>
                    <div onClick={() => this.props.history.push("/apps")} className="container-right-side-item">
                        سامانه همراه
                    </div>
                    <div onClick={() => this.props.history.push("/suggest")} className ="container-right-side-item">
                         پیشنهادات
                    </div>
                    <div onClick={() => this.props.history.push("/")} className="container-right-side-item">
                        صفحه اصلی
                    </div>
                    <div onClick={this.logout} className="container-right-side-item">
                        خروج
                    </div>
                </>
            );
        }
    }

    prepareMiddle = () => {
        const {history} = this.props;
        if (history.location.pathname !== "/login" && history.location.pathname !== "/signup") {
            return (
                <div onClick={() => this.props.history.push("/addword")} className="container-middle-item">
                    افزودن لغت
                </div>
            )
        }
        else {
            return (
                <>
                    <div onClick={() => this.props.history.push("/signup")} className="container-middle-item">
                        ثبت نام
                    </div>
                    <div onClick={() => this.props.history.push("/login")} className="container-middle-item">
                        ورود
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <div className="container-me">
                <div className="container-left-side" >
                    {this.prepareLeftSide()}
                </div>
                <div className="container-middle">
                    {this.prepareMiddle()}
                </div>
                <div className="container-right-side" >
                    {this.prepareRightSide()}
                </div>
            </div>
        );
    }
}


export default Header;