import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Graph from "./Graph";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";
import * as responseData from "../assets/state-wise-data.json";

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
    height: "38px",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 11px -1px #808080",
    },
  },
  noPaddingLeft: {
    paddingLeft: "0px",
    paddingRight: "0px !important",
    border: "0px",
  },
  noPaddingRight: {
    paddingRight: "0px",
    border: "0px",
  },
});

function State(props) {
  const classes = useStyles();
  let display;
  let rows = [];
  let totalList;
  const [isLoaded, setIsloaded] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);
  const [districtWiseResponse, setDistrictWiseResponse] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("confirmed");

  let overallConfirmed = 0;
  const rowHeader = [
    { id: "district", numeric: false, label: "District" },
    { id: "confirmed", numeric: true, label: "Confirmed" },
    { id: "active", numeric: true, label: "Active" },
    { id: "recovered", numeric: true, label: "Recovered" },
    { id: "deaths", numeric: true, label: "Deaths" },
  ];

  useEffect(() => {
    if (!isLoaded) {
      Axios.get("https://api.covid19india.org/state_district_wise.json").then(
        (res) => {
          setDistrictWiseResponse(
            res.data[props.match.params.state].districtData
          );
          setIsloaded(true);
          setIsServerDown(false);
        }
      ).catch(err => {
        console.error("server is down", err);
        setDistrictWiseResponse(responseData.default[props.match.params.state].districtData);
        setIsloaded(true);
        setIsServerDown(true);
      });
    }
  }, [isLoaded, props.match.params.state]);

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
    if (isClicked) {
      setIsClicked(false);
    }
    if (key === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  function createDataDistrict(
    district,
    confirmed,
    deltaConfirmed,
    active,
    recovered,
    deltaRecovered,
    deaths,
    deltaDeaths
  ) {
    return {
      district,
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
      <React.Fragment key={row.district}>
        <TableRow key={row.district + "row"} className={classes.row}>
          <TableCell
            key={row.district}
            align="left"
            className={classes.cellBoarder}
          >
            <span className="medium">{row.district}</span>
          </TableCell>
          <TableCell
            key={row.district + "confirmed"}
            align="right"
            className={"confirmed-cell " + classes.cellBoarder}
          >
            {row.deltaConfirmed !== 0 ? (
              <span className="small confirmed">
                <ArrowUpwardIcon fontSize="inherit" />
                {row.deltaConfirmed}{" "}
              </span>
            ) : null}
            <span className="medium">{row.confirmed}</span>
          </TableCell>
          <TableCell
            key={row.district + "active"}
            align="right"
            className={classes.cellBoarder}
          >
            <span className="medium">{row.active}</span>
          </TableCell>
          <TableCell
            key={row.district + "recoverd"}
            align="right"
            className={"recovered-cell " + classes.cellBoarder}
          >
            {row.deltaRecovered !== 0 ? (
              <span className="small recovered">
                <ArrowUpwardIcon fontSize="inherit" />
                {row.deltaRecovered}{" "}
              </span>
            ) : null}
            <span className="medium">{row.recovered}</span>
          </TableCell>
          <TableCell
            key={row.district + "deaths"}
            align="right"
            className={classes.cellBoarder}
          >
            {row.deltaDeaths !== 0 ? (
              <span className="small deaths">
                <ArrowUpwardIcon fontSize="inherit" />
                {row.deltaDeaths}{" "}
              </span>
            ) : null}
            <span className="medium">{row.deaths}</span>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
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
    Object.entries(districtWiseResponse).map(
      (district) =>
        (rows = [
          ...rows,
          createDataDistrict(
            district[0],
            district[1].confirmed,
            district[1].delta.confirmed,
            district[1].active,
            district[1].recovered,
            district[1].delta.recovered,
            district[1].deceased,
            district[1].delta.deceased
          ),
        ])
    );
    totalList = {
      state: props.match.params.state,
      confirmed: 0,
      active: 0,
      recovered: 0,
      deaths: 0,
    };
    rows.forEach((row) => {
      totalList.confirmed += row.confirmed;
      totalList.active += row.active;
      totalList.recovered += row.recovered;
      totalList.deaths += row.deaths;
    });
    rows.map((row) => (overallConfirmed += row.confirmed));
    display = (
      <>
        <h1>{props.match.params.state}</h1>
        {isLoaded && isServerDown ? (
          <h6 className="server-down">
            Backend Server is Down. The cache data shown is of date 13-sep-2020
          </h6>
        ) : (
          <></>
        )}
        <Graph totalList={totalList} />
        <CreateTable />
      </>
    );
  }

  return <>{display}</>;
}
export default State;
