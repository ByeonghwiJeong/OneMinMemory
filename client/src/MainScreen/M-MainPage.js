import React from "react";
import MainBody from "./M-Body";
import MainFooter from "./M-Footer";
import MainHeader from "./M-Header";

function MainPage() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <MainBody />
      </main>
      <MainFooter />
    </React.Fragment>
  );
}
export default MainPage;
