import React from "react";
import Main from "../../layout/main/Main";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

const basepage = () => {
  return (
    <div className="basepage">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default basepage;
