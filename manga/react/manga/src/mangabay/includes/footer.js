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
                  <Link to="http://mangariot.com/sitemap.xml">Sitemap</Link>
                </li>
                <li>
                  <Link to="/disclamer">Disclamer</Link>
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
