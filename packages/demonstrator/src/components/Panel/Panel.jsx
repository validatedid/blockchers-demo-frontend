import React from "react";
import styles from "./Panel.module.css";

export const PanelTitle = ({ children }) => (
  <div className={styles.panelTitle}>{children}</div>
);

export const PanelBody = ({ icon, title, link, linkLabel, children }) => (
  <div className={styles.panelBody}>
    <div className={styles.panelImageContainer}>
      <img
        src={icon}
        alt=""
        role="presentation"
        className={styles.panelImage}
      />
    </div>
    <div className={styles.panelMainContent}>
      <h3 className={styles.panelBodyTitle}>{title}</h3>
      <p className={styles.panelBodyText}>{children}</p>
    </div>
    <div className={styles.panelButtonContainer}>
      <a
        className={styles.panelLink}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkLabel}
      </a>
    </div>
  </div>
);

export const Panel = ({ children }) => <div>{children}</div>;
