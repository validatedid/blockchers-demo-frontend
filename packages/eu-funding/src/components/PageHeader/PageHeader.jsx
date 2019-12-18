import React from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons.svg";

export function PageHeader({ children }) {
  return (
    <div className="ecl-page-header-core">
      <div className="ecl-container">
        <nav
          data-ecl-auto-init="BreadcrumbCore"
          className="ecl-page-header-core__breadcrumb ecl-breadcrumb-core"
          aria-label="You are here:"
          data-ecl-breadcrumb-core="true"
        >
          <ol className="ecl-breadcrumb-core__container">
            <li
              className="ecl-breadcrumb-core__segment"
              data-ecl-breadcrumb-core-item="static"
              aria-hidden="false"
            >
              <Link
                to="/"
                className="ecl-breadcrumb-core__link ecl-link ecl-link--standalone"
              >
                Home
              </Link>
              <svg
                focusable="false"
                aria-hidden="true"
                role="presentation"
                className="ecl-breadcrumb-core__icon ecl-icon ecl-icon--2xs ecl-icon--rotate-90"
              >
                <use xlinkHref={`${icons}#ui--corner-arrow`}></use>
              </svg>
            </li>
            <li
              className="ecl-breadcrumb-core__segment ecl-breadcrumb-core__segment--ellipsis"
              aria-hidden="true"
              data-ecl-breadcrumb-core-ellipsis="true"
            >
              <button
                type="button"
                className="ecl-breadcrumb-core__ellipsis"
                aria-label=""
                data-ecl-breadcrumb-core-ellipsis-button="true"
              >
                …
              </button>
              <svg
                focusable="false"
                aria-hidden="true"
                role="presentation"
                className="ecl-breadcrumb-core__icon ecl-icon ecl-icon--2xs ecl-icon--rotate-90"
              >
                <use xlinkHref={`${icons}#ui--corner-arrow`}></use>
              </svg>
            </li>
            <li
              className="ecl-breadcrumb-core__segment"
              data-ecl-breadcrumb-core-item="expandable"
              aria-hidden="false"
            >
              <Link
                to="/"
                className="ecl-breadcrumb-core__link ecl-link ecl-link--standalone"
              >
                Research and innovation
              </Link>
              <svg
                focusable="false"
                aria-hidden="true"
                role="presentation"
                className="ecl-breadcrumb-core__icon ecl-icon ecl-icon--2xs ecl-icon--rotate-90"
              >
                <use xlinkHref={`${icons}#ui--corner-arrow`}></use>
              </svg>
            </li>
            <li
              className="ecl-breadcrumb-core__segment"
              data-ecl-breadcrumb-core-item="expandable"
              aria-hidden="false"
            >
              <Link
                to="/"
                className="ecl-breadcrumb-core__link ecl-link ecl-link--standalone"
              >
                Funding
              </Link>
              <svg
                focusable="false"
                aria-hidden="true"
                role="presentation"
                className="ecl-breadcrumb-core__icon ecl-icon ecl-icon--2xs ecl-icon--rotate-90"
              >
                <use xlinkHref={`${icons}#ui--corner-arrow`}></use>
              </svg>
            </li>
            <li
              className="ecl-breadcrumb-core__segment"
              data-ecl-breadcrumb-core-item="static"
              aria-hidden="false"
            >
              <Link
                to="/"
                className="ecl-breadcrumb-core__link ecl-link ecl-link--standalone"
              >
                Funding opportunities
              </Link>
              <svg
                focusable="false"
                aria-hidden="true"
                role="presentation"
                className="ecl-breadcrumb-core__icon ecl-icon ecl-icon--2xs ecl-icon--rotate-90"
              >
                <use xlinkHref={`${icons}#ui--corner-arrow`}></use>
              </svg>
            </li>
            <li
              className="ecl-breadcrumb-core__segment ecl-breadcrumb-core__current-page"
              aria-current="page"
              data-ecl-breadcrumb-core-item="static"
              aria-hidden="false"
            >
              Funding programmes and open calls
            </li>
          </ol>
        </nav>
        <h1 className="ecl-page-header-core__title">{children}</h1>
      </div>
    </div>
  );
}
