import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "shared-components";
import "./OpportunityApproveCallout.css";
import TextInput from "../FormComponents/TextInput";
import {
  resetOpportunity,
  setApprovalStatus,
  setPrivateNote,
  setPublicNote,
} from "../../store/actions/opportunity";

const OpportunityApproveCallout = ({
  publicNote,
  privateNote,
  currentStatus,
  approvalStatuses,
  onStatusChange,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [nextStatus, setNextStatus] = useState(currentStatus);
  const [newPublicNote, setNewPublicNote] = useState(publicNote);
  const [newPrivateNote, setNewPrivateNote] = useState(privateNote);
  const [publicValidated, setPublicValidated] = useState(true);
  const [privateValidated, setPrivateValidated] = useState(true);
  const listingLink = useSelector((state) => state.opportunity.link);
  const opportunityName = useSelector((state) => state.opportunity.name);

  const goBackToAdmin = () => {
    dispatch(resetOpportunity());
    history.goBack();
  };

  const validateStatusChange = () => {
    setPublicValidated(true);
    setPrivateValidated(true);
    // No business logic
    if (["PUBL", "CLOS", "NWED", "NEW"].includes(nextStatus)) {
      return true;
    }
    // EDO Comment needed
    if (["NCOM"].includes(nextStatus) && newPublicNote === "") {
      setPublicValidated(false);
      return false;
    }
    // Internal note needed
    if (["PEND"].includes(nextStatus) && newPrivateNote === "") {
      setPrivateValidated(false);
      return false;
    }
    return true;
  };

  // Get current status name
  const statusOption = approvalStatuses.find(
    (s) => currentStatus === s.status_code
  );
  const currentStatusName = statusOption && statusOption.status_name;

  // This catches possible delays in props
  useEffect(() => {
    setNextStatus(currentStatus);
    setNewPublicNote(publicNote);
    setNewPrivateNote(privateNote);
  }, [currentStatus]);

  // Validate form changes
  useEffect(() => {
    validateStatusChange();
  }, [nextStatus, newPublicNote, newPrivateNote]);

  // Add form data to state, and submit to DB
  const submitStatusChange = () => {
    if (validateStatusChange()) {
      dispatch(setApprovalStatus(nextStatus));
      dispatch(setPublicNote(newPublicNote));
      dispatch(setPrivateNote(newPrivateNote));
      onStatusChange();
    }
  };

  // Copy the visually hidden textarea
  const copyLink = () => {
    document.getElementById("link").select();
    document.execCommand("copy");
  };

  // Use broswer print method
  const openPdf = () => {
    window.print();
  };

  // Open generic email with link
  const emailLink = () => {
    const subject = opportunityName;
    let uri = "mailto:?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(window.location.origin + listingLink);
    window.open(uri);
  };

  return (
    <Container
      className="OpportunityApproveCallout"
      data-testid="OpportunityApproveCallout"
    >
      <textarea id="link" className="visually-hidden">
        {window.location.origin + listingLink}
      </textarea>
      <Row>
        <Col>
          <div role="form">
            <p>
              <b>Current Status - {currentStatusName}</b>
            </p>
            <TextInput
              heading="Internal Note"
              notes="This note will only be visible to administrators."
              id="public-note"
              rows={3}
              value={newPrivateNote}
              handleChange={(_, value) => setNewPrivateNote(value)}
            />
            <Form.Control.Feedback
              className="mt-0 mb-3"
              type="invalid"
              style={{ display: !privateValidated ? "block" : "none" }}
            >
              You must set a note for this status
            </Form.Control.Feedback>
            <TextInput
              heading="Comment to Community/EDO"
              notes="This comment will be returned to the Community User/EDO along with the status change."
              id="private-note"
              rows={3}
              value={newPublicNote}
              handleChange={(_, value) => setNewPublicNote(value)}
            />
            <Form.Control.Feedback
              className="mt-0 mb-3"
              type="invalid"
              style={{ display: !publicValidated ? "block" : "none" }}
            >
              You must send a comment with this status
            </Form.Control.Feedback>
            <div className="d-flex flex-row">
              <Form.Group controlId="regional_district">
                <Form.Label>Change Opportunity Status to</Form.Label>
                <Form.Control
                  as="select"
                  name="status-change"
                  value={nextStatus}
                  onChange={(e) => setNextStatus(e.target.value)}
                >
                  {approvalStatuses &&
                    approvalStatuses.map((status) => (
                      <option value={status.status_code}>
                        {status.status_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <div className="d-flex flex-grow-1 justify-content-end">
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => copyLink()}
                  >
                    Copy Listing Link
                  </button>
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => emailLink()}
                  >
                    Email Listing Link
                  </button>
                  <button
                    type="button"
                    className="a-tag"
                    onClick={() => openPdf()}
                  >
                    View Listing PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-bold" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            id="cancel"
            onClick={goBackToAdmin}
            label="Return to Dashboard"
            styling="BC-Gov-SecondaryButton bc-gov-btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            id="submit"
            onClick={submitStatusChange}
            label="Change Opportunity Status"
            styling="bcgov-normal-blue btn primary"
          />
        </Col>
      </Row>
    </Container>
  );
};

OpportunityApproveCallout.propTypes = {
  publicNote: PropTypes.string,
  privateNote: PropTypes.string,
  currentStatus: PropTypes.string,
  approvalStatuses: PropTypes.arrayOf(PropTypes.shape()),
  onStatusChange: PropTypes.func.isRequired,
};

OpportunityApproveCallout.defaultProps = {
  publicNote: "",
  privateNote: "",
  currentStatus: "",
  approvalStatuses: [],
};

export default OpportunityApproveCallout;
