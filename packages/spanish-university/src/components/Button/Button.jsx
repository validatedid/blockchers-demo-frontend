import React from "react";
import { Button as BSButton } from "react-bootstrap";
import classnames from "classnames";
import styles from "./Button.module.css";

export function Button({ className, ...props }) {
  return (
    <BSButton className={classnames(className, styles.button)} {...props} />
  );
}
