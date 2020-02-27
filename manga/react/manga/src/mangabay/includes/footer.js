import React from 'react';



class Footer extends React.Component {

    render() {


        return (<footer>
            <div className="footer-block">
                <div className="wrap">
                    <div className="footer-links">
                        <ul>
                            <li><a href="/sitemap">Sitemap</a></li>
                            <li><a href="/privacy">Privacy &amp; Policy</a></li>
                            <li><a href="/term-of-use">Terms of Use</a></li>
                            <li><a href="/contact-us">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="copyright">&copy; 2020 MangaBay.com</p>
        </footer>);
    }
}



export default Footer;
