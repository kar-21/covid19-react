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
        width={260}
        height={260}
        innerRadius={60}
        outerRadius={130}
      />
      <div className="detailed-entires">
        <div className="detailed-label">
          <h4>Confirmed</h4>
          <h4>Active</h4>
          <h4>Recovered</h4>
          <h4>Deaths</h4>
        </div>
        <div className="detailed-value">
          <h4 className="confirmed">{props.totalList.confirmed}</h4>
          <h4 className="active">{props.totalList.active}</h4>
          <h4 className="recovered">{props.totalList.recovered}</h4>
          <h4 className="deaths">{props.totalList.deaths}</h4>
        </div>
      </div>
    </div>
  );
}

export default Graph;
