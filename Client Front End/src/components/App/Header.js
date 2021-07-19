import React from 'react';

class Header extends React.Component {

    prepareLeftSide = () => {
        return (
            <>
                <div onClick={() => this.props.history.push("/contact")} className="container-left-side-item">
                    تماس با ما
                </div>
                <div onClick={() => this.props.history.push("/book")} className="container-left-side-item">
                    درباره کتاب
                </div>
                <div onClick={() => this.props.history.push("/authors")} className="container-left-side-item">
                    درباره مؤلفان
                </div>
            </>
        );
    }

    prepareRightSide = () => {
        return (
            <>
                <div onClick={() => this.props.history.push("/apps")} className="container-right-side-item">
                    سامانه همراه
                </div>
                <div onClick={() => this.props.history.push("/suggest")} className ="container-right-side-item">
                     پیشنهاد واژه جدید
                </div>
                <div onClick={() => this.props.history.push("/")} className="container-right-side-item">
                    صفحه اصلی
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="container-me">
                <div className="container-left-side" >
                    {this.prepareLeftSide()}
                </div>
                <div className="container-right-side" >
                    {this.prepareRightSide()}
                </div>
            </div>
        );
    }
}


export default Header;