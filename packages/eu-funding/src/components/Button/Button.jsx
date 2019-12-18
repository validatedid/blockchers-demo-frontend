import React from "react";
import classnames from "classnames";
import styles from "./Button.module.css";

export function Button({ className, ...props }) {
  return (
    <button
      className={classnames(
        "ecl-button",
        "ecl-button--primary",
        className,
        styles.button
      )}
      type="button"
      {...props}
    />
  );
}
