import React from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons.svg";

export function Footer({ children }) {
  return (
    <footer className="ecl-footer-core">
      <div className="ecl-container ecl-footer-core__container">
        <div className="ecl-footer-core__section ecl-footer-core__section1">
          <Link
            to="/"
            className="ecl-footer-core__title ecl-link ecl-link--standalone"
          >
            European Commission website
          </Link>
          <div className="ecl-footer-core__description">
            This is not a real site of the European Commission
          </div>
        </div>
        <div className="ecl-footer-core__section ecl-footer-core__section2 ecl-footer-core__section--separator">
          <ul className="ecl-footer-core__list ecl-footer-core__list--columns">
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Strategy
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                About the European Commission
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Business, Economy, Euro
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Live, work, travel in the EU
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Law
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Funding, Tenders
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Research and innovation
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Energy, Climate change, Environment
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Education
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Aid, Development cooperation, Fundamental rights
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Food, Farming, Fisheries
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                EU regional and urban development
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Jobs at the European Commission
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Statistics
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                News
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Events
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Publications
              </Link>
            </li>
          </ul>
        </div>
        <div className="ecl-footer-core__section ecl-footer-core__section3">
          <ul className="ecl-footer-core__list">
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Contact the European Commission
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone ecl-link--icon ecl-link--icon-after"
              >
                <span className="ecl-link__label">
                  Follow the European Commission on social media
                </span>
                &nbsp;
                <svg
                  focusable="false"
                  aria-hidden="true"
                  className="ecl-link__icon ecl-icon ecl-icon--xs"
                >
                  <use xlinkHref={`${icons}#ui--external`}></use>
                </svg>
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Resources for partners
              </Link>
            </li>
          </ul>
        </div>
        <div className="ecl-footer-core__section ecl-footer-core__section4">
          <ul className="ecl-footer-core__list">
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Language policy
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Cookies
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Privacy policy
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Legal notice
              </Link>
            </li>
            <li className="ecl-footer-core__list-item">
              <Link
                to="/"
                className="ecl-footer-core__link ecl-link ecl-link--standalone"
              >
                Brexit content disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
