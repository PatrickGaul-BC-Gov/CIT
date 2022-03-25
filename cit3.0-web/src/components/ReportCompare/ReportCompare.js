import React, { useState, useEffect } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Printer } from "react-bootstrap-icons";
import Config from "../../Config";
import "./ReportCompare.css";

export default function ReportCompare() {
  const [report, setReport] = useState(null);
  const [token, setToken] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdCompare;

  const layoutSettings = {
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  };

  const inititalReportConfig = {
    type: "report",
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: { ...layoutSettings },
  };

  const [embedReportConfig, setEmbedReportConfig] = useState(
    inititalReportConfig
  );

  const getReportConfig = async () => {
    const response = await axios.get(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const getReportToken = async () => {
    const response = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
      { accessLevel: "view" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.token;
  };

  const eventHandlersMap = new Map([
    ["loaded", function reportLoaded() {}],
    ["rendered", function reportRendered() {}],
    [
      "error",
      function reportErrored(event) {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
  ]);

  const loadReport = async () => {
    const reportConfig = await getReportConfig();
    const reportToken = await getReportToken();

    setEmbedReportConfig({
      ...embedReportConfig,
      id: reportConfig.id,
      embedUrl: reportConfig.embedUrl,
      accessToken: reportToken,
    });
    setShowReport(true);
  };

  const handlePrint = async () => {
    if (!report) return;
    await report.print();
  };

  useEffect(() => {
    async function getToken() {
      const response = await axios.get("/api/token/");
      setToken(response.data.access_token);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (token) loadReport();
  }, [token]);

  const printButtons = (
    <div className="d-flex flex-row-reverse">
      <div>
        <Button type="button" variant="light" onClick={handlePrint}>
          <Printer /> Print
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {showReport && (
        <>
          <PowerBIEmbed
            embedConfig={embedReportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName="report-compare-container"
            getEmbeddedComponent={(embedObject) => {
              setReport(embedObject);
            }}
          />
        </>
      )}
    </>
  );
}

ReportCompare.propTypes = {};

ReportCompare.defaultProps = {};
