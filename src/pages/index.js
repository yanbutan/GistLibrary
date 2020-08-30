import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import GistListPage from "../components/gistListPage/gistListPage";
import PersonalPage from "../components/personalPage/personalPage";
import { Router } from "@reach/router";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <Router basepath="/">
        <GistListPage path="/" />
        <PersonalPage path="personal" />
      </Router>
    </Layout>
  );
}

export default IndexPage;
