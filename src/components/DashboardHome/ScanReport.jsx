import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Upload from "../../assets/uploadFile.png";
import Modal from "react-modal";
import Message from "../../pages/dashboard/upload/Message";
import Progress from "../../pages/dashboard/upload/Progress";
import { Button, P } from "../../globalStyles/style";
import { Redirect } from "react-router-dom";
import Piechart from "./ChartIOS";
import axios from "axios";

const CardContainer = styled.div`
  width: 500px;
  height: 400px;
  left: 252px;
  top: 191px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  p {
    width: 250px;
    word-wrap: break-word;
    font-weight: 400;
    font-size: 19px;
    line-height: 31px;
    color: #5b5b5b;
    text-align: center;
  }
`;

const UploadFile = styled.img`
  width: 190px;
  height: 190px;
`;

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    paddingLeft: "20px",
  },
};

const CardText = styled.div`
  padding: 1rem 2rem;
`;

const SubTitle = styled.p`
  font-weight: 00;
  font-size: 18px;
  color: #757575;
  margin: 0px;
`;

const ScanReport = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState("Choose File");
  const [project_name, setProject_name] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [err, setErr] = useState(false);
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState(false);
  const [report, setReport] = useState("");

  useEffect(() => {
    setProject_name(JSON.parse(sessionStorage.getItem("project__")));
    // setReport(JSON.parse(sessionStorage.getItem("report")));
    // const projectName = JSON.parse(sessionStorage.getItem("project__"));
    const res = JSON.parse(sessionStorage.getItem("report"));
   setReport(res.ios)

  }, [report]);



  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setErr(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.set("project_name", project_name);
    try {
      const response2 = await axios.post(
        "https://aquiladev.azurewebsites.net/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },

          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );
      sessionStorage.setItem("response2", JSON.stringify(response2));
      console.log(response2, "res2");
      setUpload(true);

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { file, project_name } = response2.data;

      setUploadedFile({ file, project_name });

      setMessage("File Uploaded");
    } catch (err) {
      if (err) {
        setErr(true);
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  if (upload) {
    return <Redirect to="/dashboard/upload-result/" />;
  }

  return (
    <>
      {report ? (
        <div>
          <CardContainer>
            <CardText>
              <Title>File Name:</Title>
              {/* <SubTitle>Testing xx</SubTitle> */}
              <SubTitle>{report.APP_NAME}</SubTitle>

              <Title>Size:</Title>
              {/* <SubTitle>Texting xx</SubTitle> */}
              <SubTitle>{report.SIZE}</SubTitle>
            </CardText>

            <Piechart report={report} />
          </CardContainer>
        </div>
      ) : (
        <div>
          <CardContainer onClick={() => openModal()}>
            <div style={{ margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <UploadFile src={Upload} alt="upload file" />
              </div>
              <Title>
                <p>Please Upload app file to view Scan report</p>
              </Title>
            </div>
          </CardContainer>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <P color="#5B5B5B" fw="700" fs="22px" mb="0px">
                Please wait, your app is scanning ...
              </P>
              <Button onClick={closeModal} bc="transparent" fs="22px" fw="700">
                X
              </Button>
            </div>

            <P color="#757575" fs="14px">
              please uploading an unobscuted and unecrypted app file will help
              detect security flaws
            </P>

            <P color="#5B5B5B" fw="700" fs="22px" mb="0px"></P>
            <Fragment>
              {message && <Message msg={message} /> }
              <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                  />
                  {err && 
                    <p style={{ color: "red" }}>File type not supported</p>
                  }
                  <label className="custom-file-label" htmlFor="customFile">
                    {filename}
                  </label>
                </div>

                <Progress percentage={uploadPercentage} />

                <input
                  type="submit"
                  value="Upload"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
              {uploadedFile &&
                <div className="row mt-5">
                  <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img
                      style={{ width: "100%" }}
                      src={uploadedFile.filePath}
                      alt=""
                    />
                  </div>
                </div>
              }
            </Fragment>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ScanReport;
