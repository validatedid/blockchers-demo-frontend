import React from "react";
import { Link } from "react-router-dom";

import ECLogo from "../../assets/logo.svg";
import icons from "../../assets/icons.svg";

export function Header() {
  return (
    <header
      data-ecl-auto-init="SiteHeaderCore"
      className="ecl-site-header-core"
    >
      <div className="ecl-site-header-core__container ecl-container">
        <div className="ecl-site-header-core__top">
          <Link
            className="ecl-link ecl-link--standalone ecl-site-header-core__logo-link"
            to="/"
            aria-label="European Commission"
          >
            <img
              alt="European Commission logo"
              title="European Commission"
              className="ecl-site-header-core__logo-image"
              src={ECLogo}
            />
          </Link>
          <div className="ecl-site-header-core__action">
            <div className="ecl-site-header-core__search-container">
              <a
                className="ecl-link ecl-link--standalone ecl-site-header-core__search-toggle"
                href="#search"
                data-ecl-search-toggle="true"
                aria-controls="search-form-id"
                aria-expanded="false"
              >
                <svg
                  focusable="false"
                  aria-hidden="true"
                  className="ecl-icon ecl-icon--s"
                >
                  <use xlinkHref={`${icons}#general--search`}></use>
                </svg>
                Search
              </a>
              <form
                id="search-form-id"
                data-ecl-search-form="true"
                className="ecl-site-header-core__search ecl-search-form"
                role="search"
              >
                <div className="ecl-form-group ecl-form-group--text-input">
                  <label
                    className="ecl-search-form__label ecl-form-label"
                    htmlFor="search-input-id"
                  >
                    Search
                  </label>
                  <input
                    type="search"
                    id="search-input-id"
                    className="ecl-search-form__text-input ecl-text-input"
                  />
                </div>
                <button
                  aria-label="Search"
                  type="submit"
                  className="ecl-search-form__button ecl-button ecl-button--search"
                >
                  <span className="ecl-button__container">
                    <span className="ecl-button__label" data-ecl-label="true">
                      Search
                    </span>
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      data-ecl-icon="true"
                      className="ecl-button__icon ecl-button__icon--after ecl-icon ecl-icon--xs"
                    >
                      <use xlinkHref={`${icons}#general--search`}></use>
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
