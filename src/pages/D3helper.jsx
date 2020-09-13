import React from "react";
import * as d3 from "d3";

import PropTypes from "prop-types";

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    {/* <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="white"
      fontSize="14"
    >
      {format(data.value)}
    </text> */}
  </g>
);

const Pie = (props) => {
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(["#DC143C", "#14cC3C", "#595959"]);
  const format = d3.format(".0f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
      </g>
    </svg>
  );
};

Pie.propTypes = {
  innerRadius: PropTypes.any,
  outerRadius: PropTypes.any,
  data: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
};

Arc.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  createArc: PropTypes.any,
  colors: PropTypes.any,
  format: PropTypes.any,
};

export default Pie;
