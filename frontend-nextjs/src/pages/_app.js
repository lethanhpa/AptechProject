import React from "react";
import PropTypes from "prop-types";
import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Head from "@/components/head";
import axiosClient from "../libraries/axiosClient";

function App({ Component, pageProps }) {
  // const token = localStorage.getItem("token");

  // axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

  return (
    <>
      <Head />
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

// App.propTypes = {
//   Component: PropTypes.func.isRequired,
//   pageProps: PropTypes.instanceOf().isRequired,
// };
export default App;