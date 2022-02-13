import React, { useRef, useState, useEffect } from 'react';
import { select, Selection } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

const data = [
  {
    name: 'foo',
    units: 32,
  },
  {
    name: 'bar',
    units: 67,
  },
  {
    name: 'baz',
    units: 81,
  },
  {
    name: 'hoge',
    units: 38,
  },
  {
    name: 'piyo',
    units: 28,
  },
  {
    name: 'hogera',
    units: 59,
  },
];

const Axis: React.FC = () => {
  const dimensions = {
    width: 600,
    height: 600,
    marginLeft: 100,
    marginBottom: 100,
    chartHeight: 500,
    chartWidth: 500,
  };
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.units)!])
    .range([dimensions.width - dimensions.marginBottom, 0]);

  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width - dimensions.marginLeft])
    .padding(0.1);

  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} units`);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      const xAxisGroup = selection
        .append('g')
        .attr(
          'transform',
          `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
        )
        .call(xAxis);

      xAxisGroup
        .selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('font-size', '15px');

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis);

      const charts = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', (d) => dimensions.chartHeight - y(d.units))
        .attr('x', (d) => x(d.name)!)
        //translate the bars
        .attr('y', (d) => y(d.units));
    }
  }, [selection]);
  return (
    <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
  );
};

export default Axis;
