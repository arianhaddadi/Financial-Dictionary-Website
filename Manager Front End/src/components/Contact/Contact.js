import React from 'react';
import linkedInLogo from '../../resources/icons/in.png';
import wikiLogo from '../../resources/icons/w.png';
import emailLogo from '../../resources/icons/mail.png';
import "./style/Contact.scss";


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.contactInfo = [];
        this.contactInfo.push({
            name:"دکتر غلامرضا نظربلند",
            email:"ghrnazar@yahoo.com",
            linkedIn:"https://ir.linkedin.com/",
            wikipedia:"https://fa.wikipedia.org/wiki/%D8%B5%D9%81%D8%AD%D9%87%D9%94_%D8%A7%D8%B5%D9%84%DB%8C"
        });
        this.contactInfo.push({
            name:"دکتر حسین عبده تبریزی",
            email:"abdoh@abdoh.net",
            linkedIn:"https://ir.linkedin.com/in/hossein-abdoh-tabrizi-a92ab14a",
            wikipedia:"https://fa.wikipedia.org/wiki/%D8%AD%D8%B3%DB%8C%D9%86_%D8%B9%D8%A8%D8%AF%D9%87_%D8%AA%D8%A8%D8%B1%DB%8C%D8%B2%DB%8C"
        });
    }

    renderInfos = () => {
        return this.contactInfo.map(
            (elem) => {
                return (
                    <div className="info-segment">
                        <div className="name">
                            {elem.name}
                        </div>
                        <div className="email">
                            {elem.email}
                        </div>
                        <div className="links">
                            <a href={elem.linkedIn} >
                                <img alt="" src={linkedInLogo} />
                            </a>
                            <a href={elem.wikipedia} >
                                <img alt="" src={wikiLogo} />
                            </a>
                            <a href={`mailto:${elem.email}`} >
                                <img alt="" src={emailLogo} />
                            </a>
                        </div>
                    </div>
                )
            }
        )
    }

    render() {
        return (
            <div className="contact-info">
                <div className="infos">
                    {this.renderInfos()}
                </div>
                <div className="inputs">
                    <div className="name">
                        <label for="name">نام</label>
                        <input className="btn contact-input" id="name" type="text" name="name" />
                    </div>
                    <div className="subject">
                        <label for="subject">موضوع</label>
                        <input className="btn contact-input" id="subject" type="text" name="subject" />
                    </div>
                    <div className="email">
                        <label for="email">ایمیل</label>
                        <input className="btn contact-input" id="email" type="text" name="email" />
                    </div>
                    <div className="message">
                        <label for="message">پیام</label>
                        <textarea className="btn contact-input" id="message" type="text" name="message" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        ارسال
                    </button>
                </div>
            </div>
        )
    }
}

export default Contact;