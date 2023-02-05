import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
//Head is the same head in html above the body

// children is to pass th entire main component at the _app.js
function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
