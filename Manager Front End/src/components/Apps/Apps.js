import React from 'react';
import androidLogo from "../../resources/icons/android.png";
import iosLogo from "../../resources/icons/ios.png";
import "../Book/style/Book.scss";


class Apps extends React.Component {

    renderAppsInfo = () => {
        return (
            <div className="post-content">
                <div className="persian">
                    <p>
                        سامانه&thinsp;هایی جهت استفاده در دستگاه&thinsp;های هوشمند تلفن همراه طراحی شده است که بصورت رایگان در اختیار کاربران قرار می&thinsp;&shy;گیرد. این سامانه&thinsp;ها برای دو سیستم عامل
                        اندروید و IOS طراحی شده&thinsp;اند و تمام قابلیت&thinsp;هایی که روی وبسایت وجود دارند، از طریق این سامانه&thinsp;ها در اختیار کاربران قرار داده می&thinsp;&shy;شود. از آن&shy;&thinsp;جا که پایگاه
                        داده&thinsp;&shy;ی وبسایت پیوسته از طریق ارسال دیدگاه&thinsp;ها و پیشنهادات کاربران در حال به&thinsp;&shy;روز رسانی است، به همین دلیل این سامانه&thinsp;ها مستقیما به هسته&shy;&thinsp;ی مرکزی وبسایت متصل
                        می&shy;&thinsp;باشند و امکان به&thinsp;&shy;روز رسانی پایگاه داده روی دستگاه&thinsp;های هوشمند وجود دارد. بسته به سرعت اینترنت روی دستگاه&thinsp;&shy;های هوشمند، این فرآیند یک الی چهار دقیقه ممکن
                        است طول بکشد.
                    </p>
                    <p>
                        لطفاً دیدگاه&thinsp;&shy;ها و پیشنهادات خود را از طریق این سامانه&thinsp;ها مطرح نمایید. همچنین اگر پیشنهاد واژه&thinsp;ی جدید و یا درخواست معنی برای یک واژه را دارید، از طریق
                        فرم&thinsp;&shy;های مخصوص در داخل سامانه&thinsp;ها مطرح نمایید. هم&thinsp;&shy;اکنون می-&thinsp;توانید این دو سامانه را بصورت رایگان از طریق لینک&thinsp;های زیر دریافت نمایید.
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
                        <img alt="" src={androidLogo} />
                    </a>
                    <a href="https://appsto.re/us/n6RO_.i">
                        <img alt="" src={iosLogo} />
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