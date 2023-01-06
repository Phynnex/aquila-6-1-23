import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from './ChartAPK'
import { checkExpiredUserToken } from "utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import Piechart from "./ChartAPK";
import { Div } from 'globalStyles/style';

const CardContainer = styled.div`
  width: 500px;
  height: 400px;
  left: 252px;
  top: 191px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

const CardText = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 1rem;
  line-height: 30px;
  color: #5b5b5b;
  margin-bottom: 0px;
`;
const SubTitle = styled.p`
  font-weight: 00;
  font-size: 18px;
  color: #757575;
  margin: 0px;
`;

const ScanAnalyzer = () => {
  const [report, setReport] = useState("");

  const project_name = JSON.parse(sessionStorage.getItem("project__"));

  useEffect(() => {
    checkExpiredUserToken();
    
    const fetchData = async () => {
      try {
        const request = await axios.get(
          "https://aquiladev.azurewebsites.net/api/reports/",
          { 
            params: { 
              project_name,
              scan_type: 'apk'
            } 
          }
        );
        setReport(request.data.data.apk)
        sessionStorage.setItem('report',JSON.stringify(request.data.data))
        // console.log(request.data.data.apk.INFO, 'reqest')
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log(report, 'report')
  }, [report]);


  // const {APP_NAME, SIZE} = report.data.data.apk

  return (
    <CardContainer>
      <CardText>
        <Title>File Name:</Title>
        <SubTitle>{report.APP_NAME}</SubTitle>

        <Title>Size:</Title>
        <SubTitle>{report.SIZE}</SubTitle>
      </CardText>
      
      <Piechart report={report}/>

     
    </CardContainer>
  );
};

export default ScanAnalyzer;
