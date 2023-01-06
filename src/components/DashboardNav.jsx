import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DLogo from "../assets/DashboardLogo.png";
import App from "../assets/app.png";
import Notifications from "../assets/notification.png";
import Down from "../assets/down2.png";
import Profile from "../assets/profile.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { checkExpiredUserToken } from "utils";

export default function DashboardNav() {
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    checkExpiredUserToken();

    const fetchData = async () => {
      try {
        const request = await axios.get(
          "https://aquiladev.azurewebsites.net/api/profile/"
        );
        const { username } = request.data;
        const x = username[0].toUpperCase() + username.substring(1);
        console.log(x)
        setProfileName(x)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(profileName, "profile");

  return (
    <Nav>
      <div className="title">
        <Link to="/">
          <img src={DLogo} alt="dashboard-logo" />
        </Link>
      </div>
      <div className="search">
        <Link to="/first-login">
          <img src={App} alt="app" />
        </Link>
        <img src={Notifications} alt="bell" />
        <img src={Profile} alt="profile-pic" />

        <p>{profileName}</p>

        <img src={Down} alt="down-arrow" />
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5b5b5b;
  background: #ffffff;
  font-weight: 700;
  box-shadow: 0px 2px 4px 0px #00000040;
  padding: 0 2rem;

  .search {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem 2rem 0.5rem 0rem;
  }
`;
