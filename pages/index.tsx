import type { NextPage } from "next";
import Head from "next/head";

import SearchBox from "../components/SearchBox";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Li.Fi Transaction Checking</title>
      </Head>

      <div className="home">
        <div className="container">
          <SearchBox placeholder="Search for a transaction through Li.Fi" />
        </div>
      </div>
    </div>
  );
};

export default Home;
