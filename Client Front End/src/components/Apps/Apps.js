import React from 'react';
import androidLogo from "../../resources/icons/android.png";
import iosLogo from "../../resources/icons/ios.png";
import "../Book/style/Book.scss";


class Apps extends React.Component {

    renderAppsInfo = () => {
        return (
            <div class="post-content">
                <div className="persian">
                    <p>
                        سامانه هایی جهت استفاده در دستگاه های هوشمند تلفن همراه طراحی شده است که بصورت رایگان در اختیار کاربران قرار می گیرد. این سامانه ها برای دو سیستم عامل
                        اندروید و IOS طراحی شده اند و تمام قابلیت هایی که روی وبسایت وجود دارند، از طریق این سامانه ها در اختیار کاربران قرار داده می شود. از آن جا که پایگاه
                        داده ی وبسایت پیوسته از طریق ارسال دیدگاه ها و پیشنهادات کاربران در حال به روز رسانی است، به همین دلیل این سامانه ها مستقیما به هسته ی مرکزی وبسایت متصل
                        می باشند و امکان به روز رسانی پایگاه داده روی دستگاه های هوشمند وجود دارد. بسته به سرعت اینترنت روی دستگاه های هوشمند، این فرآیند یک الی چهار دقیقه ممکن
                        است طول بکشد.
                    </p>
                    <p>
                        لطفاً دیدگاه ها و پیشنهادات خود را از طریق این سامانه ها مطرح نمایید. همچنین اگر پیشنهاد واژه ی جدید و یا درخواست معنی برای یک واژه را دارید، از طریق
                        فرم های مخصوص در داخل سامانه ها مطرح نمایید. هم اکنون می- توانید این دو سامانه را بصورت رایگان از طریق لینک های زیر دریافت نمایید.
                    </p>
                </div>
            </div>
        )
    }

    renderAppsLinks = () => {
        return (
            <div className="apps-links">
                <div className="title">
                    اپلیکیشن ها
                </div>
                <div className="links">
                    <a href="https://cafebazaar.ir/app/ir.investopedia.dic/?l=fa">
                        <img src={androidLogo} />
                    </a>
                    <a href="https://appsto.re/us/n6RO_.i">
                        <img src={iosLogo} />
                    </a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                <div className="title">
                    سامانه های همراه
                </div>
                {this.renderAppsInfo()}
                {this.renderAppsLinks()}
            </>
        )
    }
}

export default Apps;