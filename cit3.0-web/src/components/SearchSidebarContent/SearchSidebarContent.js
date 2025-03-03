import { useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import {
  Button,
  Col,
  Collapse,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { MdHelp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InputRangeWithTextboxes from "../InputRangeWithTextboxes/InputRangeWithTextboxes";
import InlineSelectFilter from "../InlineSelectFilter/InlineSelectFilter";
import InlineCommunityOrPopulationProximityFilter from "../InlineCommunityOrPopulationProximityFilter/InlineCommunityOrPopulationProximityFilter";
import "./SearchSidebarContent.scss";
import { getOptions, setOptions } from "../../store/actions/options";
import InlineNumberRangeFilter from "../InlineNumberRangeFilter/InlineNumberRangeFilter";

const FORM_EXCLUDE_UNKNOWNS = "exclude_unknowns";
const FORM_OPPORTUNITY_ROAD_CONNECTED = "opportunity_road_connected";
const FORM_OPPORTUNITY_WATER_CONNECTED = "opportunity_water_connected";
const FORM_OPPORTUNITY_SEWER_CONNECTED = "opportunity_sewer_connected";
const FORM_OPPORTUNITY_ELECTRICAL_CONNECTED =
  "opportunity_electrical_connected";
const FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED =
  "opportunity_natural_gas_connected";
const FORM_CONNECTIVITY = "connectivity";

const FORM_REGIONAL_DISTRICT = "regional_district";

const FORM_PARCEL_SIZE_MIN = "parcel_size_min";
const FORM_PARCEL_SIZE_MAX = "parcel_size_max";

const FORM_POWER_TRANSMISSION_LINES_MIN = "power_transmission_lines_min";
const FORM_POWER_TRANSMISSION_LINES_MAX = "power_transmission_lines_max";

const FORM_AIR_SERVICE_MIN = "air_service_min";
const FORM_AIR_SERVICE_MAX = "air_service_max";

const FORM_RAIL_CONNECTIONS_MIN = "rail_connections_min";
const FORM_RAIL_CONNECTIONS_MAX = "rail_connections_max";

const FORM_DEEP_WATER_PORT_MIN = "deep_water_port_min";
const FORM_DEEP_WATER_PORT_MAX = "deep_water_port_max";

const FORM_POST_SECONDARY = "post_secondary_within_100km";
const FORM_RESEARCH_CENTRE = "research_centre_within_100km";

const FORM_COMMUNITY_POPULATION_DISTANCE_MIN =
  "community_population_distance_min";
const FORM_COMMUNITY_POPULATION_DISTANCE_MAX =
  "community_population_distance_max";
const FORM_PROXIMITY_COMMUNITY_ID = "proximity_community_id";
const FORM_PROXIMITY_POPULATION = "proximity_population";

const FORM_ZONING = "zoning";

const generalArrow = "";

export default function SearchSidebarContent({
  onQuery,
  resetFilters,
  search,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const regionalDistricts = useSelector(
    (state) => state.options.regionalDistricts
  );
  const communityOptions = useSelector(
    (state) => state.options.communities
  ).map((option) => ({ value: option.id, label: option.place_name }));

  const parcelSizeInitial = {
    max:
      FORM_PARCEL_SIZE_MAX in search
        ? parseFloat(search[FORM_PARCEL_SIZE_MAX])
        : 2000,
    min:
      FORM_PARCEL_SIZE_MIN in search
        ? parseFloat(search[FORM_PARCEL_SIZE_MIN])
        : 0,
  };
  const powerTransmissionLinesInitial = {
    max:
      FORM_POWER_TRANSMISSION_LINES_MAX in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MAX])
        : 100,
    min:
      FORM_POWER_TRANSMISSION_LINES_MIN in search
        ? parseFloat(search[FORM_POWER_TRANSMISSION_LINES_MIN])
        : 0,
  };
  const airServiceInitial = {
    max:
      FORM_AIR_SERVICE_MAX in search
        ? parseFloat(search[FORM_AIR_SERVICE_MAX])
        : 500,
    min:
      FORM_AIR_SERVICE_MIN in search
        ? parseFloat(search[FORM_AIR_SERVICE_MIN])
        : 0,
  };
  const railConnectionsInitial = {
    max:
      FORM_RAIL_CONNECTIONS_MAX in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MAX])
        : 500,
    min:
      FORM_RAIL_CONNECTIONS_MIN in search
        ? parseFloat(search[FORM_RAIL_CONNECTIONS_MIN])
        : 0,
  };
  const deepWaterPortInitial = {
    max:
      FORM_DEEP_WATER_PORT_MAX in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MAX])
        : 500,
    min:
      FORM_DEEP_WATER_PORT_MIN in search
        ? parseFloat(search[FORM_DEEP_WATER_PORT_MIN])
        : 0,
  };
  const proximityToCommunityOrPopulationInitial = {
    max:
      FORM_COMMUNITY_POPULATION_DISTANCE_MAX in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MAX])
        : 500,
    min:
      FORM_COMMUNITY_POPULATION_DISTANCE_MIN in search
        ? parseFloat(search[FORM_COMMUNITY_POPULATION_DISTANCE_MIN])
        : 0,
  };
  const proximityCurrentCommunityInitial =
    FORM_PROXIMITY_COMMUNITY_ID in search
      ? communityOptions.find(
          (item) =>
            item.value === parseInt(search[FORM_PROXIMITY_COMMUNITY_ID], 10)
        )
      : null;
  const proximityCurrentPopulationInitial =
    FORM_PROXIMITY_POPULATION in search
      ? parseInt(search[FORM_PROXIMITY_POPULATION], 10)
      : null;
  const zoningQueryFiltersInitial = "";
  const zoningFiltersInitial = [
    {
      label: "Commercial",
      code: "COMM",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("COMM") : false,
    },
    // {
    //   label: "Residential",
    //   code: "RESD",
    //   isSelected:
    //     FORM_ZONING in search ? search[FORM_ZONING].includes("RESD") : false,
    // },
    {
      label: "Agriculture",
      code: "AGRI",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("AGRI") : false,
    },
    {
      label: "Industrial-light",
      code: "INDL",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("INDL") : false,
    },
    {
      label: "Industrial-heavy",
      code: "INDH",
      isSelected:
        FORM_ZONING in search ? search[FORM_ZONING].includes("INDH") : false,
    },
  ];

  const [regionalDistrict, setRegionalDistrict] = useState(
    FORM_REGIONAL_DISTRICT in search ? search[FORM_REGIONAL_DISTRICT] : null
  );
  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(
    FORM_PARCEL_SIZE_MIN in search || FORM_PARCEL_SIZE_MAX in search
  );
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
    parcelSizeInitial
  );
  const [parcelSizeDisplayRange, setParcelSizeDisplayRange] = useState(
    parcelSizeInitial
  );
  const [
    powerTransmissionLinesIsSelected,
    setPowerTransmissionLinesIsSelected,
  ] = useState(
    FORM_POWER_TRANSMISSION_LINES_MIN in search ||
      FORM_POWER_TRANSMISSION_LINES_MAX in search
  );
  const [
    powerTransmissionLinesInputRange,
    setPowerTransmissionLinesInputRange,
  ] = useState(powerTransmissionLinesInitial);
  const [
    powerTransmissionLinesDisplayRange,
    setPowerTransmissionLinesDisplayRange,
  ] = useState(powerTransmissionLinesInitial);
  const [airServiceIsSelected, setAirServiceIsSelected] = useState(
    FORM_AIR_SERVICE_MIN in search || FORM_AIR_SERVICE_MAX in search
  );
  const [airServiceInputRange, setAirServiceInputRange] = useState(
    airServiceInitial
  );
  const [airServiceDisplayRange, setAirServiceDisplayRange] = useState(
    airServiceInitial
  );
  const [deepWaterPortIsSelected, setDeepWaterPortIsSelected] = useState(
    FORM_DEEP_WATER_PORT_MIN in search || FORM_DEEP_WATER_PORT_MAX in search
  );
  const [deepWaterPortInputRange, setDeepWaterPortInputRange] = useState(
    deepWaterPortInitial
  );
  const [deepWaterPortDisplayRange, setDeepWaterPortDisplayRange] = useState(
    deepWaterPortInitial
  );

  const [railConnectionsIsSelected, setRailConnectionsIsSelected] = useState(
    FORM_RAIL_CONNECTIONS_MIN in search || FORM_RAIL_CONNECTIONS_MAX in search
  );
  const [railConnectionsInputRange, setRailConnectionsInputRange] = useState(
    railConnectionsInitial
  );
  const [
    railConnectionsDisplayRange,
    setRailConnectionsDisplayRange,
  ] = useState(railConnectionsInitial);
  const [
    proximityToCommunityOrPopulationIsSelected,
    setProximityToCommunityOrPopulationIsSelected,
  ] = useState(
    FORM_COMMUNITY_POPULATION_DISTANCE_MAX in search ||
      FORM_COMMUNITY_POPULATION_DISTANCE_MIN in search
  );
  const [
    proximityToCommunityOrPopulationInputRange,
    setProximityToCommunityOrPopulationInputRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [
    proximityToCommunityOrPopulationDisplayRange,
    setproximityToCommunityOrPopulationDisplayRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [proximityCurrentCommunity, setProximityCurrentCommunity] = useState(
    proximityCurrentCommunityInitial
  );
  const [proximityCurrentPopulation, setProximityCurrentPopulation] = useState(
    proximityCurrentPopulationInitial
  );

  const [zoningIsSelected, setZoningIsSelected] = useState(
    FORM_ZONING in search
  );
  const [zoningQueryFilters, setZoningQueryFilters] = useState(
    zoningQueryFiltersInitial
  );
  const [zoningFilters, setZoningFilters] = useState(zoningFiltersInitial);

  const [connectivitySwitchValue, setConnectivitySwitchValue] = useState(
    FORM_CONNECTIVITY in search ? search[FORM_CONNECTIVITY] === "Y" : false
  );

  const [roadAccessSwitchValue, setRoadAccessSwitchValue] = useState(
    FORM_OPPORTUNITY_ROAD_CONNECTED in search
      ? search[FORM_OPPORTUNITY_ROAD_CONNECTED] === "Y"
      : false
  );
  const [waterSwitchValue, setWaterSwitchValue] = useState(
    FORM_OPPORTUNITY_WATER_CONNECTED in search
      ? search[FORM_OPPORTUNITY_WATER_CONNECTED] === "Y"
      : false
  );
  const [sewerSwitchValue, setSewerSwitchValue] = useState(
    FORM_OPPORTUNITY_SEWER_CONNECTED in search
      ? search[FORM_OPPORTUNITY_SEWER_CONNECTED] === "Y"
      : false
  );
  const [
    electricalInfrastructureSwitchValue,
    setElectricalInfrastructureSwitchValue,
  ] = useState(
    FORM_OPPORTUNITY_ELECTRICAL_CONNECTED in search
      ? search[FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED] === "Y"
      : false
  );
  const [naturalGasSwitchValue, setNaturalGasSwitchValue] = useState(
    FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED in search
      ? search[FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED] === "Y"
      : false
  );

  const [excludeUnknowns, setExcludeUnknowns] = useState(
    FORM_EXCLUDE_UNKNOWNS in search
      ? search[FORM_EXCLUDE_UNKNOWNS] === "Y"
      : false
  );

  const [postSecondarySwitchValue, setPostSecondarySwitchValue] = useState(
    FORM_POST_SECONDARY in search ? search[FORM_POST_SECONDARY] === "Y" : false
  );
  const [researchCentreSwitchValue, setResearchCentreSwitchValue] = useState(
    FORM_RESEARCH_CENTRE in search
      ? search[FORM_RESEARCH_CENTRE] === "Y"
      : false
  );
  const siteServicingFilters = [
    {
      label: "Road access:",
      checked: roadAccessSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_ROAD_CONNECTED]: value ? "Y" : "N" });
        setRoadAccessSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ROAD_CONNECTED,
    },
    {
      label: "Water:",
      checked: waterSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_WATER_CONNECTED]: value ? "Y" : "N" });
        setWaterSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_WATER_CONNECTED,
    },
    {
      label: "Sewer:",
      checked: sewerSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_SEWER_CONNECTED]: value ? "Y" : "N" });
        setSewerSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_SEWER_CONNECTED,
    },
    {
      label: "Electrical Infrastructure:",
      checked: electricalInfrastructureSwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_OPPORTUNITY_ELECTRICAL_CONNECTED]: value ? "Y" : "N" });
        setElectricalInfrastructureSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_ELECTRICAL_CONNECTED,
    },
    {
      label: "Natural Gas:",
      checked: naturalGasSwitchValue,
      onChange: (value) => {
        onQuery({
          [FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED]: value ? "Y" : "N",
        });
        setNaturalGasSwitchValue(value);
      },
      queryKey: FORM_OPPORTUNITY_NATURAL_GAS_CONNECTED,
    },
    {
      label: "Connectivity (50/10Mbps+)",
      checked: connectivitySwitchValue,
      onChange: (value) => {
        onQuery({ [FORM_CONNECTIVITY]: !excludeUnknowns });
        setConnectivitySwitchValue(value);
      },
      queryKey: FORM_CONNECTIVITY,
    },
  ];

  const InputRangeWithTextboxess = [
    {
      selected: parcelSizeIsSelected,
      value: parcelSizeDisplayRange,
      queryKey: {
        min: FORM_PARCEL_SIZE_MIN,
        max: FORM_PARCEL_SIZE_MAX,
      },
    },
    {
      selected: powerTransmissionLinesIsSelected,
      value: powerTransmissionLinesDisplayRange,
      queryKey: {
        min: FORM_POWER_TRANSMISSION_LINES_MIN,
        max: FORM_POWER_TRANSMISSION_LINES_MAX,
      },
    },
    {
      selected: airServiceIsSelected,
      value: airServiceDisplayRange,
      queryKey: {
        min: FORM_AIR_SERVICE_MIN,
        max: FORM_AIR_SERVICE_MAX,
      },
    },
    {
      selected: railConnectionsIsSelected,
      value: railConnectionsDisplayRange,
      queryKey: {
        min: FORM_RAIL_CONNECTIONS_MIN,
        max: FORM_RAIL_CONNECTIONS_MAX,
      },
    },
    {
      selected: deepWaterPortIsSelected,
      value: deepWaterPortDisplayRange,
      queryKey: {
        min: FORM_DEEP_WATER_PORT_MIN,
        max: FORM_DEEP_WATER_PORT_MAX,
      },
    },
  ];
  // Fetch options, if not already stored on client
  if (!communityOptions.length) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
      const selected = response.data.communities.find(
        (item) => item.id === parseInt(search[FORM_PROXIMITY_COMMUNITY_ID], 10)
      );
      if (selected) {
        setProximityCurrentCommunity({
          value: selected.id,
          label: selected.place_name,
        });
      }
    });
  }
  const handleRegionalDistrictChange = (nextRDCode) => {
    setRegionalDistrict(nextRDCode);
    onQuery({ [FORM_REGIONAL_DISTRICT]: nextRDCode });
  };

  const handleResetFilters = () => {
    // eslint-disable-next-line
    search = {};
    resetFilters();
    resetFilters();
    setExcludeUnknowns(false);
    setParcelSizeIsSelected(false);
    setParcelSizeInputRange({ min: 0, max: 2000 });
    setParcelSizeDisplayRange({ min: 0, max: 2000 });
    setPowerTransmissionLinesIsSelected(false);
    setPowerTransmissionLinesInputRange({ min: 0, max: 100 });
    setPowerTransmissionLinesDisplayRange({ min: 0, max: 100 });
    setAirServiceIsSelected(false);
    setAirServiceInputRange({ min: 0, max: 500 });
    setAirServiceDisplayRange({ min: 0, max: 500 });
    setDeepWaterPortIsSelected(false);
    setDeepWaterPortInputRange({ min: 0, max: 500 });
    setDeepWaterPortDisplayRange({ min: 0, max: 500 });
    setRailConnectionsIsSelected(false);
    setRailConnectionsInputRange({ min: 0, max: 500 });
    setRailConnectionsDisplayRange({ min: 0, max: 500 });
    setProximityToCommunityOrPopulationIsSelected(false);
    setProximityToCommunityOrPopulationInputRange({ min: 0, max: 500 });
    setproximityToCommunityOrPopulationDisplayRange({ min: 0, max: 500 });
    setProximityCurrentCommunity(null);
    setProximityCurrentPopulation(null);
    setZoningIsSelected(false);
    setZoningQueryFilters(zoningQueryFiltersInitial);
    setZoningFilters(zoningFiltersInitial);
    setConnectivitySwitchValue(false);
    setRoadAccessSwitchValue(false);
    setWaterSwitchValue(false);
    setSewerSwitchValue(false);
    setElectricalInfrastructureSwitchValue(false);
    setNaturalGasSwitchValue(false);
    setPostSecondarySwitchValue(false);
    setResearchCentreSwitchValue(false);
  };

  const siteServicingSection = siteServicingFilters.map((switchFilter) => (
    <Row
      className="flex-nowrap bcgov-siteserv-filters"
      key={switchFilter.label}
    >
      <Col xs={9}>
        <p>{switchFilter.label}</p>
      </Col>
      <Col xs="auto">
        <Switch
          className="bcgov-ciot-filter-switch"
          checked={switchFilter.checked}
          onChange={switchFilter.onChange}
          onColor="#c8e7f1"
          offColor="#d2d2d2"
          onHandleColor="#666666"
          offHandleColor="#666666"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 0px 0px #d2d2d2"
          activeBoxShadow="0px 0px 0px 0px #d2d2d2"
          height={25}
          width={48}
        />
      </Col>
    </Row>
  ));

  const renderTooltip = (props) => (
    // TODO: get text for this, currently placeholder
    <Tooltip id="button-tooltip" {...props}>
      Choose whether to exclude or include opportunities with site servicing
      values that are not set to Yes or No.
    </Tooltip>
  );

  // const [isGeneralOpen, setGeneralOpen] = useState(true);
  // const [isServicingOpen, setServicingOpen] = useState(false);
  // const [isTransportationOpen, setTransportationOpen] = useState(false);
  // const [isNearbyCommunitiesOpen, setNearbyCommunitiesOpen] = useState(false);
  // const [isAdvancedAnROpen, setAdvancedAnROpen] = useState(false);
  // const [isRegionalDistrictOpen, setRegionalDistrictOpen] = useState(false);

  return (
    <div className="search-sidebar-content">
      {/* <h2>Filter your search</h2> */}
      <h2>
        General Site Details
        {/* <Button
          className="bcgov-filter-toggle"
          onClick={() => setGeneralOpen(!isGeneralOpen)}
          aria-controls="example-collapse-text"
          aria-expanded={isGeneralOpen}
        >
          {isGeneralOpen ? "⏶" : "⏷"}
        </Button> */}
      </h2>
      <h3>Parcel Size</h3>
      <InlineNumberRangeFilter
        // show={isGeneralOpen}
        inputRange={{ min: 0, max: 2000 }}
        units="acres"
        className=""
        label=""
        description="Size of Property (in acres)"
        isSelected={parcelSizeIsSelected}
        setIsSelected={setParcelSizeIsSelected}
        inputRangeValue={parcelSizeInputRange}
        setInputRangeValue={setParcelSizeInputRange}
        displayRange={parcelSizeDisplayRange}
        setDisplayRange={setParcelSizeDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_PARCEL_SIZE_MIN]: value.min,
            [FORM_PARCEL_SIZE_MAX]: value.max,
          });
        }}
      />
      <h3>Zoning</h3>
      <InlineSelectFilter
        // show={isGeneralOpen}
        filters={zoningFilters}
        setFilters={setZoningFilters}
        isSelected={zoningIsSelected}
        setIsSelected={setZoningIsSelected}
        setQueryFilters={(filter) => {
          onQuery({ [FORM_ZONING]: filter });
          setZoningQueryFilters(filter);
        }}
      />
      <h3>Power Transmission Lines</h3>
      <InlineNumberRangeFilter
        inputRange={{ min: 0, max: 100 }}
        units="km"
        description="Straight line distance to power transmission lines (km)"
        isDistance
        isSelected={powerTransmissionLinesIsSelected}
        setIsSelected={setPowerTransmissionLinesIsSelected}
        inputRangeValue={powerTransmissionLinesInputRange}
        setInputRangeValue={setPowerTransmissionLinesInputRange}
        displayRange={powerTransmissionLinesDisplayRange}
        setDisplayRange={setPowerTransmissionLinesDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_POWER_TRANSMISSION_LINES_MIN]: value.min,
            [FORM_POWER_TRANSMISSION_LINES_MAX]: value.max,
          });
        }}
      />
      <h2>Site Servicing</h2>
      {siteServicingSection}
      <Row className="flex-nowrap">
        <Col xs="auto" className="exclude-unknown-section-checkbox">
          <input
            type="checkbox"
            checked={excludeUnknowns}
            value={excludeUnknowns}
            onChange={() => {
              onQuery({
                [FORM_EXCLUDE_UNKNOWNS]: !excludeUnknowns ? "Y" : "N",
              });
              setExcludeUnknowns(!excludeUnknowns);
            }}
          />
        </Col>
        <Col xs="auto" className="exclude-unknown-section">
          <span>
            Exclude Unknown{" "}
            <span>
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <MdHelp color="#2693e6" size="1.3em" />
              </OverlayTrigger>
            </span>
          </span>
        </Col>
      </Row>
      <h2>Transportation</h2>
      <InlineNumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to airport (km)"
        label="Air Service"
        isDistance
        isSelected={airServiceIsSelected}
        setIsSelected={setAirServiceIsSelected}
        inputRangeValue={airServiceInputRange}
        setInputRangeValue={setAirServiceInputRange}
        displayRange={airServiceDisplayRange}
        setDisplayRange={setAirServiceDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_AIR_SERVICE_MIN]: value.min,
            [FORM_AIR_SERVICE_MAX]: value.max,
          });
        }}
      />
      <InlineNumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to rail connections (km)"
        label="Rail Connections"
        isDistance
        isSelected={railConnectionsIsSelected}
        setIsSelected={setRailConnectionsIsSelected}
        inputRangeValue={railConnectionsInputRange}
        setInputRangeValue={setRailConnectionsInputRange}
        displayRange={railConnectionsDisplayRange}
        setDisplayRange={setRailConnectionsDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_RAIL_CONNECTIONS_MIN]: value.min,
            [FORM_RAIL_CONNECTIONS_MAX]: value.max,
          });
        }}
      />
      <InlineNumberRangeFilter
        inputRange={{ min: 0, max: 500 }}
        units="km"
        description="Straight line distance to deep water port (km)"
        label="Deep Water Port"
        isDistance
        isSelected={deepWaterPortIsSelected}
        setIsSelected={setDeepWaterPortIsSelected}
        inputRangeValue={deepWaterPortInputRange}
        setInputRangeValue={setDeepWaterPortInputRange}
        displayRange={deepWaterPortDisplayRange}
        setDisplayRange={setDeepWaterPortDisplayRange}
        onSave={(value) => {
          onQuery({
            [FORM_DEEP_WATER_PORT_MIN]: value.min,
            [FORM_DEEP_WATER_PORT_MAX]: value.max,
          });
        }}
      />
      <h2>Nearby Communities</h2>
      {communityOptions ? (
        <InlineCommunityOrPopulationProximityFilter
          inputRange={{ min: 0, max: 500 }}
          units="km"
          label="Proximity to community/population"
          isSelected={proximityToCommunityOrPopulationIsSelected}
          setIsSelected={setProximityToCommunityOrPopulationIsSelected}
          inputRangeValue={proximityToCommunityOrPopulationInputRange}
          setInputRangeValue={setProximityToCommunityOrPopulationInputRange}
          initialInputRangeValues={proximityToCommunityOrPopulationInitial}
          displayRange={proximityToCommunityOrPopulationDisplayRange}
          setDisplayRange={setproximityToCommunityOrPopulationDisplayRange}
          currentCommunity={proximityCurrentCommunity}
          setCurrentCommunity={setProximityCurrentCommunity}
          currentPopulation={proximityCurrentPopulation}
          setCurrentPopulation={setProximityCurrentPopulation}
          onSave={(value) => {
            const updateQuery = {
              [FORM_COMMUNITY_POPULATION_DISTANCE_MIN]: value.min,
              [FORM_COMMUNITY_POPULATION_DISTANCE_MAX]: value.max,
            };
            if (value.id) {
              updateQuery[FORM_PROXIMITY_COMMUNITY_ID] = value.id;
            }
            if (value.pop) {
              updateQuery[FORM_PROXIMITY_POPULATION] = value.pop;
            }
            onQuery(updateQuery);
          }}
        />
      ) : null}

      <h2>Advanced Education &amp; Research</h2>
      <Row className="flex-nowrap">
        <Col xs={9}>
          <p>Post-secondary Institute within 100km?:</p>
        </Col>
        <Col xs="auto">
          <Switch
            className="bcgov-ciot-filter-switch"
            checked={postSecondarySwitchValue}
            onChange={(value) => {
              onQuery({ [FORM_POST_SECONDARY]: value ? "Y" : "N" });
              setPostSecondarySwitchValue(value);
            }}
            onColor="#c8e7f1"
            offColor="#d2d2d2"
            onHandleColor="#666666"
            offHandleColor="#666666"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px #d2d2d2"
            activeBoxShadow="0px 0px 0px 0px #d2d2d2"
            height={25}
            width={48}
          />
        </Col>
      </Row>
      <Row className="flex-nowrap">
        <Col xs={9}>
          <p>Research Centre within 100km?:</p>
        </Col>
        <Col xs="auto">
          <Switch
            className="bcgov-ciot-filter-switch"
            checked={researchCentreSwitchValue}
            onChange={(value) => {
              onQuery({ [FORM_RESEARCH_CENTRE]: value ? "Y" : "N" });
              setResearchCentreSwitchValue(value);
            }}
            onColor="#c8e7f1"
            offColor="#d2d2d2"
            onHandleColor="#666666"
            offHandleColor="#666666"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px #d2d2d2"
            activeBoxShadow="0px 0px 0px 0px #d2d2d2"
            height={25}
            width={48}
          />
        </Col>
      </Row>
      <h2>Regional District</h2>
      <Form.Group controlId="regional_district">
        <Form.Label className="visually-hidden">To</Form.Label>
        <Form.Control
          as="select"
          name="regional-district"
          value={regionalDistrict}
          onChange={(e) => handleRegionalDistrictChange(e.target.value)}
        >
          <option value="">All</option>
          {regionalDistricts &&
            regionalDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <hr className="hr-bold" />
      <div className="d-flex bcgov-ciot-button">
        <Button
          styling="BC-Gov-SecondaryButton"
          label="Reset all filters"
          onClick={() => handleResetFilters()}
        >
          Reset all filters
        </Button>
      </div>
      <div className="d-flex bcgov-ciot-search-button">
        <Button
          onClick={() => history.push(`/investmentopportunities/search`)}
          width="150"
        >
          <span>Search&nbsp;&nbsp;</span>
          <img
            src="/images/searchIcon.svg"
            className="bcgov-ciot-button-icon"
            width="20"
            height="20"
            alt="Search"
            styling="margin-top: -2px; width: 100px;"
          />
        </Button>
      </div>
    </div>
  );
}

SearchSidebarContent.propTypes = {
  onQuery: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  search: PropTypes.shape().isRequired,
};
