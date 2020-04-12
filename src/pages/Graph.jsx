import React from "react";
import "./Graph.css";

import D3helper from "./D3helper";
import PropTypes from "prop-types";

Graph.propTypes = {
  totalList: PropTypes.any,
};

function Graph(props) {
  let data = [
    { name: "Active", value: props.totalList.active, color: "marron" },
    { name: "Recovered", value: props.totalList.recovered, color: "green" },
    { name: "Deaths", value: props.totalList.deaths, color: "gray" },
  ];

  return (
    <div className="donut-graph">
      <h3 className="confimed-head">{props.totalList.confirmed}</h3>
      <D3helper
        data={data}
        width={200}
        height={200}
        innerRadius={60}
        outerRadius={100}
      />
    </div>
  );
}

export default Graph;
