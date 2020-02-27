import React from "react";

import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-block">
          <div className="wrap">
            <div className="footer-links">
              <ul>
                <li>
                  <Link to="/sitemap">Sitemap</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy &amp; Policy</Link>
                </li>
                <li>
                  <Link to="/term-of-use">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="copyright">&copy; 2020 MangaBay.com</p>
      </footer>
    );
  }
}

export default Footer;
