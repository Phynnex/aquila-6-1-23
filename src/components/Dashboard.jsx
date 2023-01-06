import React, { useEffect } from "react";
import styled from "styled-components";
// import Analytics from "./Analytics";
// import Earnings from "./Earnings";
// import FAQ from "./FAQ";
// import Profile from "./Profile";
// import Transfers from "./Transfers";
import scrollreveal from "scrollreveal";
import { dashboardRoutes } from "../pages/dashboard/routes"
import { Switch, Route } from "react-router-dom"
// import ScanAnalyzer  from '../components/DashboardHome/ScanAnalyzer';

export default function Dashboard() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <Section>
      <Switch>
        {dashboardRoutes.map((route, i) => (
          <Route key={i} exact={route.exact} path={route.path} component={route.component} />
        ))}
      </Switch>

      

      {/* <div className="grid">
        <div className="row__one">
          <Analytics />
          <FAQ />
        </div>
        <div className="row__two">
          <Earnings />
          <Transfers />
          <Profile />
        </div>
      </div> */}
    </Section>
  );
}

const Section = styled.section`
  margin-left: 14vw;
  position:fixed;
  // padding: 2rem;
  background: #EDEFF5;

  height: 100vh;
  // width: calc(100% - 14vw);
  width: 100%;
  overflow-y: scroll;
//   .grid {
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     gap: 1rem;
//     margin-top: 2rem;
//     .row__one {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       height: 50%;
//       gap: 1rem;
//     }
//     .row__two {
//       display: grid;
//       grid-template-columns: repeat(3, 1fr);
//       gap: 1rem;
//       height: 50%;
//     }
//   }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;