import React from "react";
import styles from "./Panel.module.css";

export const PanelTitle = ({ children }) => (
  <div
    style={{
      background: "#fffe",
      padding: "1rem 2rem",
      color: "#444"
    }}
  >
    {children}
  </div>
);

export const PanelBody = ({ icon, title, link, linkLabel, children }) => (
  <div
    style={{
      display: "flex",
      background: "#fff",
      padding: "2rem 2rem",
      color: "#444"
    }}
  >
    <div style={{ paddingRight: "1rem" }}>
      <img src={icon} alt="" />
    </div>
    <div style={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0" }}>{title}</h3>
      <p style={{ fontSize: "1rem" }}>{children}</p>
    </div>
    <div
      style={{
        width: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}
    >
      <a className={styles["demo-link"]} href={link}>
        {linkLabel}
      </a>
    </div>
  </div>
);

export const Panel = ({ children }) => <div>{children}</div>;
