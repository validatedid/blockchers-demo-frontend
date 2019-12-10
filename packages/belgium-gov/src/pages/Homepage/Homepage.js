import React, { Component } from "react";
import styles from "./Homepage.module.css";
import { H1, P } from "../../components/Typography/Typography";

class Homepage extends Component {
  render() {
    return (
      <div className={styles.App}>
        <H1>Belgian Federal Government - demo</H1>
        <P>Disclaimer</P>
        <P>Explain purpose & flow of the demo</P>
      </div>
    );
  }
}

export default Homepage;
