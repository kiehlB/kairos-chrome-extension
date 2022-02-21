import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import * as d3 from 'd3';
import { computeSizes } from './utils';
import useClientDimensions from '../../hooks/useClientDimensions';
import { BASE_SIZE } from '../../lib/styles/constants';
import usePrevious from '../../hooks/usePrevious';

function BarChart({ data, axis, grid, maxValue, minValue, tooltipComponent }) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredDatum, setHoveredDatum] = useState<any | null>(null);
  const Ref = useRef<SVGGElement | null>(null);
  const [containerRef, { height: containerHeight, width: containerWidth }] =
    useClientDimensions();
  const { horizontal, vertical } = grid;
  const margin = {
    left: BASE_SIZE * 4.5,
    right: 0,
    top: 0,
    bottom: BASE_SIZE * 3,
  };

  const { chartHeight, chartWidth, scaleX, scaleY, svgHeight, svgWidth } =
    useMemo(
      () =>
        computeSizes({
          containerHeight,
          containerWidth,
          data,
          margin,
          maxValue,
          minValue,
        }),
      [containerHeight, containerWidth, data, margin, maxValue, minValue]
    );

  const chartRef = useRef<SVGGElement | null>(null);
  const prevData = usePrevious(data);
  const prevScaleY = usePrevious(scaleY);

  const onMouseEnter = useCallback((d) => setIsHovering(true), []);
  const onMouseOver = useCallback(setHoveredDatum, []);
  const onMouseLeave = useCallback((d) => setIsHovering(false), []);

  useEffect(() => {
    const svg = d3.select(Ref.current);

    svg.selectAll('g').remove();

    // Draw bars
    const bars = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'vertical-bar-chart__bar-container');

    if (true) {
      const widthReservedForPadding = chartWidth * scaleX.paddingInner();
      const barPadding = widthReservedForPadding / scaleX.domain().length / 2;
      const barContainerWidth = scaleX.bandwidth() + barPadding * 2;

      bars
        .on('mouseover', (d) => onMouseOver(d))
        .on('mouseenter', (d) => onMouseEnter(d))
        .on('mouseleave', (d) => onMouseLeave(d))
        .append('rect')
        .attr('class', 'vertical-bar-chart__bar--background')
        .attr('x', (d) => (scaleX(d.x) || 0) - barPadding)
        .attr('width', () => barContainerWidth)
        .attr('y', () => 0)
        .attr('height', () => chartHeight);
    }

    bars
      .append('rect')
      .attr('class', 'vertical-bar-chart__bar')
      .attr('x', (d) => scaleX(d.x) || 0)
      .attr('width', () => scaleX.bandwidth())
      .attr('y', (d, i) =>
        prevData && prevScaleY ? prevScaleY(prevData[i].y) || 0 : chartHeight
      )
      .attr('height', (d, i) =>
        prevData && prevScaleY
          ? chartHeight - (prevScaleY(prevData[i].y) || 0)
          : 0
      )
      .transition()
      .attr('y', (d) => scaleY(d.y) || 0)
      .attr('height', (d) => chartHeight - (scaleY(d.y) || 0))
      .duration(500);

    if (grid.horizontal.enable) {
      const horizontalGrid = d3.axisRight(scaleY).tickSize(chartWidth);
      if (grid.horizontal.tickValues && grid.horizontal.tickValues.length > 0) {
        horizontalGrid.tickValues(grid.horizontal.tickValues);
      }
      svg
        .append('g')
        .attr('class', 'grid grid__horizontal-lines')
        .call(horizontalGrid)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove());
    }

    if (grid.vertical.enable) {
      const verticalAxis = d3.axisBottom(scaleX).tickSize(chartHeight);
      if (grid.vertical.tickValues && grid.vertical.tickValues.length > 0) {
        verticalAxis.tickValues(grid.vertical.tickValues);
      }
      svg
        .append('g')
        .attr('class', 'grid grid__vertical-lines')
        .call(verticalAxis)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove());
    }
  }, [
    chartHeight,
    chartWidth,
    scaleX,
    scaleY,
    horizontal,
    vertical,
    data,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    scaleX,
    scaleY,
    prevData,
    prevScaleY,
  ]);

  return (
    <>
      <div className='w-full h-full border-2' ref={containerRef}>
        <div className='vertical-bar-chart__container'>
          <svg height={svgHeight} width={svgWidth}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g ref={Ref} />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default BarChart;
