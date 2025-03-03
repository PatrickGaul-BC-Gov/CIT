import "./citHome.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../HomePage/HomePage.scss";
import { Button as SharedButton } from "shared-components";
import { useState } from "react";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";
import DisclaimerCIT from "../../DisclaimerCIT/DisclaimerCIT";

export default function citHome() {
  const history = useHistory();
  const keycloak = useKeycloakWrapper();
  const [loggedInWithIdir] = useState(keycloak.idp === "idir");
  const configuration = useConfiguration();
  const [show, setShow] = useState(false);
  const [loginButtonText] = useState(
    loggedInWithIdir ? "Continue with IDIR" : "Login with IDIR"
  );
  const [modalTitleText] = useState(
    loggedInWithIdir
      ? "Would you like to continue to the internal report or the public report?"
      : "Would you like to log in or continue as public?"
  );

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const publicUrl = "/cit-dashboard/public";
  const privateUrl = "/cit-dashboard/internal";
  const searchRoute = "/search-communities";

  const [goToCommPage, setGoToCommPage] = useState(false);

  const handlePublic = () => {
    if (goToCommPage) {
      history.push(`${publicUrl}${searchRoute}`);
    } else {
      history.push(publicUrl);
    }
  };

  const handleLogin = () => {
    // login with IDIR only and redirect to private report
    let loginWithIdir;
    if (goToCommPage) {
      loginWithIdir = keycloak.obj.createLoginUrl({
        idpHint: "idir",
        redirectUri: encodeURI(
          `${configuration.baseUrl}${privateUrl}${searchRoute}`
        ),
      });
    } else {
      loginWithIdir = keycloak.obj.createLoginUrl({
        idpHint: "idir",
        redirectUri: encodeURI(`${configuration.baseUrl}${privateUrl}`),
      });
    }

    window.location.href = loginWithIdir;
  };

  return (
    <>
      <Container className="py-5 px-2">
        <Row>
          <Col sm={9}>
            <h1 className="main-text py-2">
              Welcome to the Community <br />
              Information Tool
            </h1>
            <h2>
              Explore B.C. communities and analyze data from a community lens.
            </h2>
            <p className="py-4">
              The Community Information Tool offers insight into communities
              across B.C. with integrated socioeconomic data, infrastructure,
              and community assets data. The Tool supports community, regional,
              and province-wide planning which is essential to building
              thriving, healthy communities.
              <br />
              <br />
              We are continuing to evolve the tool and would appreciate{" "}
              <a href="mailto:citinfo@gov.bc.ca">your feedback</a>. Please check
              back in April 2022 for new updates.
            </p>
          </Col>
          <Col sm={3} className="svg-box pt-3">
            <img
              className="add-opp-img"
              src="/images/CIT_logo.svg"
              height="100%"
              width="100%"
              alt="cit logo mountains"
            />
          </Col>
        </Row>
        <Row>
          <Col className="box mr-3 cit-box">
            <Row>
              <Col>
                <h3>View my community or region</h3>
                <p className="my-2">
                  Community and regional profiles include socioeconomic data,
                  infrastructure and community assets to provide a sense of what
                  a community is like – and how it is changing.{" "}
                </p>
                <></>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4">
                <SharedButton
                  onClick={() => {
                    setGoToCommPage(true);
                    handleShow();
                  }}
                  styling="home-buttons explore-button"
                  label="Search For Your Community"
                />
              </Col>
            </Row>
            <Row className=" mb-0 pb-0 d-flex justify-content-end">
              <Col sm={3} className="svg-box">
                <img
                  className="add-opp-img"
                  src="/images/house_CITHOME.svg"
                  height="100%"
                  width="100%"
                  alt="cit home community search box"
                />
              </Col>
            </Row>
          </Col>
          <Col className="box ml-3 cit-box explore-box corner">
            <Row>
              <Col>
                <h3>Discover insights and patterns among B.C. communities</h3>
                <p className="my-2">
                  Find all communities in B.C. with particular characteristics –
                  whether you’re interested in economic health, access to
                  education and health care, connectivity, infrastructure, or
                  emergency management.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4">
                <SharedButton
                  onClick={handleShow}
                  styling="home-buttons explore-button"
                  label="Explore B.C. Communities"
                />
              </Col>
            </Row>
            <Row className="mb-0 pr-0 mt-3 d-flex justify-content-end">
              <Col sm={6} className="p-0 pt-1 mb-0 svg-box">
                <img
                  className="add-opp-img"
                  src="/images/HouseMountain.svg"
                  height="100%"
                  width="100%"
                  alt="cit home community search box"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <DisclaimerCIT />
      <Modal
        show={show}
        centered
        onHide={handleClose}
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>{modalTitleText}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            *Please note that you must be logged in with an IDIR to continue to
            the internal report.
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <SharedButton
            label="Continue as Public"
            styling="bcgov-normal-white mr-auto modal-reset-button btn"
            onClick={handlePublic}
          />
          <SharedButton
            label={loginButtonText}
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleLogin}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
