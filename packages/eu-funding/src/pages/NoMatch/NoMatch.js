import React from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { P } from "../../components/Typography/Typography";

function NoMatch() {
  return (
    <>
      <PageHeader>Page not found</PageHeader>
      <div className="ecl-container ecl-u-mt-xl">
        <P>This resource doesn't exist.</P>
      </div>
    </>
  );
}

export default NoMatch;
