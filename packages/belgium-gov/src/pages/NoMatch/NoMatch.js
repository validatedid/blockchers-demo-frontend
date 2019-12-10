import React, { Component } from "react";
import styles from "./NoMatch.module.css";
import { H1 } from "../../components/Typography/Typography";

class NoMatch extends Component {
  render() {
    return (
      <div className={styles.App}>
        <H1>Page not found.</H1>
      </div>
    );
  }
}

export default NoMatch;
