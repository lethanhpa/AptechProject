import React from "react";
import PropTypes from "prop-types";
import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Head from "@/components/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};
export default App;