import React, { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Graph from "./Graph";

// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "80%",
    minWidth: "770px",
    margin: "auto",
    marginTop: "10px",
  },
  header: {
    borderRadius: "5px",
    background: "lightGray",
  },
  cellBoarder: {
    border: "0px",
    height: "35px",
  },
  cellBoarderDistrict: {
    border: "0px",
    height: "25px",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 11px -1px #808080",
    },
  },
  noPaddingLeft: {
    paddingLeft: "0px",
    paddingRight: "65px !important",
    border: "0px",
  },
  noPaddingRight: {
    paddingRight: "0px",
    border: "0px",
  },
});

function Home() {
  const classes = useStyles();
  let display;
  let rows = [];
  let totalList;
  const [isLoaded, setIsloaded] = useState(false);
  const [statewiseResponse, setStatewiseResponse] = useState({});
  const [disctrictResponse, setDistrictResponse] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [clickedState, setClickedState] = useState();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("confirmed");
  let overallConfirmed = 0;
  const rowHeader = [
    { id: "state", numeric: false, label: "State" },
    { id: "confirmed", numeric: true, label: "Confirmed" },
    { id: "active", numeric: true, label: "Active" },
    { id: "recovered", numeric: true, label: "Recovered" },
    { id: "deaths", numeric: true, label: "Deaths" },
  ];
  const rowDistrictHeader = [
    { id: "district", numeric: false, label: "District" },
    { id: "confirmed", numeric: true, label: "Confirmed" },
  ];

  useEffect(() => {
    if (!isLoaded) {
      Axios.get("https://api.covid19india.org/data.json").then((res) => {
        setStatewiseResponse(res.data.statewise);
        Axios.get("https://api.covid19india.org/state_district_wise.json").then(
          (res) => {
            setDistrictResponse(res.data);
            setIsloaded(true);
          }
        );
      });
    }
  }, [isLoaded]);

  function Header() {
    return (
      <TableRow key="header-row" className={classes.header}>
        {rowHeader.map((header) => (
          <TableCell
            key={header.id}
            align={header.numeric ? "right" : "left"}
            className={classes.cellBoarder}
          >
            <TableSortLabel
              active={orderBy === header.id ? true : false}
              direction={order}
              onClick={() => changeSortingOrder(header.id)}
            >
              <h3>{header.label}</h3>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const changeSortingOrder = (key) => {
    if (key === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  function createDataState(
    state,
    confirmed,
    deltaConfirmed,
    active,
    recovered,
    deltaRecovered,
    deaths,
    deltaDeaths
  ) {
    return {
      state,
      confirmed,
      deltaConfirmed,
      active,
      recovered,
      deltaRecovered,
      deaths,
      deltaDeaths,
    };
  }

  function sortDataIn(key = "confirmed", order = "asc") {
    rows.sort(compareKeys(key, order));
  }

  function compareKeys(key, order) {
    return function innerSort(a, b) {
      const varA = isNaN(Number(a[key]))
        ? a[key].toUpperCase()
        : Number(a[key]);
      const varB = isNaN(Number(b[key]))
        ? b[key].toUpperCase()
        : Number(b[key]);

      let comparison = 0;
      if (varA > varB) {
        comparison = -1;
      } else if (varA < varB) {
        comparison = 1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  function TableContent() {
    sortDataIn(orderBy, order);
    return rows.map((row) => (
      <>
        <TableRow
          key={row.state + "row"}
          className={classes.row}
          onClick={() => {
            if (row.state === clickedState) {
              setIsClicked(!isClicked);
            } else {
              setClickedState(row.state);
              setIsClicked(true);
            }
          }}
        >
          <TableCell
            key={row.state}
            align="left"
            className={classes.cellBoarder}
          >
            <span className="medium">{row.state}</span>
          </TableCell>
          <TableCell
            key={row.state + "confirmed"}
            align="right"
            className={classes.cellBoarder}
          >
            <span className="small confirmed">[+{row.deltaConfirmed}] </span>
            <span className="medium confirmed">{row.confirmed}</span>
          </TableCell>
          <TableCell
            key={row.state + "active"}
            align="right"
            className={classes.cellBoarder}
          >
            <span className="medium active">{row.active}</span>
          </TableCell>
          <TableCell
            key={row.state + "recoverd"}
            align="right"
            className={classes.cellBoarder}
          >
            <span className="small recovered">[+{row.deltaRecovered}] </span>
            <span className="medium recovered">{row.recovered}</span>
          </TableCell>
          <TableCell
            key={row.state + "deaths"}
            align="right"
            className={classes.cellBoarder}
          >
            <span className="small deaths">[+{row.deltaDeaths}] </span>
            <span className="medium deaths">{row.deaths}</span>
          </TableCell>
        </TableRow>
        {isClicked && clickedState === row.state ? (
          <StateData stateKey={row.state} />
        ) : null}
      </>
    ));
  }

  function StateData(state) {
    return (
      <TableRow rowSpan={2}>
        <TableCell className={classes.noPaddingRight}>
          <Table size="small">
            <TableHead className={classes.header}>
              <TableCell
                className={classes.cellBoarderDistrict}
                key={rowDistrictHeader[0].label}
              >
                {rowDistrictHeader[0].label}
              </TableCell>
            </TableHead>
            <TableBody>
              {Object.keys(disctrictResponse[state.stateKey].districtData).map(
                (district) => (
                  <TableRow key={district}>
                    <TableCell
                      className={classes.cellBoarderDistrict}
                      key={district + "name"}
                    >
                      {district}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableCell>
        <TableCell className={classes.noPaddingLeft}>
          <Table size="small">
            <TableHead className={classes.header}>
              <TableCell
                align="right"
                className={classes.cellBoarderDistrict}
                key={rowDistrictHeader[1].label}
              >
                {rowDistrictHeader[1].label}
              </TableCell>
            </TableHead>
            <TableBody>
              {Object.keys(disctrictResponse[state.stateKey].districtData).map(
                (district) => (
                  <TableRow key={district}>
                    <TableCell
                      align="right"
                      className={classes.cellBoarderDistrict}
                      key={district + "confirmed"}
                    >
                      {
                        disctrictResponse[state.stateKey].districtData[district]
                          .confirmed
                      }
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    );
  }

  function CreateTable() {
    return (
      <Paper elevation={3} className={classes.root}>
        <TableContainer>
          <Table size="small" className={classes.table}>
            <TableHead key="header">
              <Header />
            </TableHead>
            <TableBody>
              <TableContent />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
  if (isLoaded) {
    statewiseResponse.map(
      (state) =>
        (rows = [
          ...rows,
          createDataState(
            state.state,
            state.confirmed,
            state.deltaconfirmed,
            state.active,
            state.recovered,
            state.deltarecovered,
            state.deaths,
            state.deltadeaths
          ),
        ])
    );
    totalList = rows[0];
    rows = rows.splice(1, rows.length);
    rows.map((row) => (overallConfirmed += row.confirmed));
    display = (
      <>
        <Graph totalList={totalList} />
        <CreateTable />
      </>
    );
  }

  return <>{display}</>;
}
export default Home;
