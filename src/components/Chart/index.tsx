import React, { useRef, useState, useEffect } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import 'd3-transition';
import { easeElastic } from 'd3-ease';
import randomstring from 'randomstring';

let initialData = [
  {
    name: 'foo',
    units: 10,
  },
  {
    name: 'bar',
    units: 20,
  },
  {
    name: 'baz',
    units: 30,
  },
  {
    name: 'hoge',
    units: 40,
  },
  {
    name: 'piyo',
    units: 50,
  },
  {
    name: 'hogera',
    units: 60,
  },
];
const Transition = (xy) => {
  const newData = xy.xy.map((d) => ({
    x: d.timestamp,
    y: d.totalDuration,
  }));

  const dimensions = { width: 795, height: 315 };
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState(initialData);

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  console.log(newData);
  let x = scaleBand()
    .domain(newData.map((d) => d.x))
    .range([0, dimensions.width])
    .padding(0.05);

  let y = scaleLinear()
    .domain([0, max(newData, (d: any) => d.y / 1000000) as any])
    .range([dimensions.height, 0]);

  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      selection
        .selectAll('rect')
        .data(newData)
        .enter()
        .append('rect')
        .attr('x', (d: any) => x(d.x)!)
        .attr('y', dimensions.height)
        .attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('height', 0)
        /**
         * Transitions work similar to CSS Transitions
         * From an inital point, to the conlcuded point
         * in which you set the duration, and the ease
         * and a delay if you'd like
         */
        .transition()
        .duration(700)
        .delay((_, i) => i * 100)
        .ease(easeElastic)
        .attr('height', (d: any) => dimensions.height - y(d.y / 1000000))
        .attr('y', (d: any) => y(d.y / 1000000));
    }
  }, [selection]);

  useEffect(() => {
    if (selection) {
      x = scaleBand()
        .domain(newData.map((d) => d.x))
        .range([0, dimensions.width])
        .padding(0.05);
      y = scaleLinear()
        .domain([0, max(newData, (d: any) => d.y / 1000000) as any])
        .range([dimensions.height, 0]);

      const rects = selection.selectAll('rect').data(newData);

      rects
        .exit()
        .transition()
        .ease(easeElastic)
        .duration(400)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .remove();

      /**
       * a delay is added here to aid the transition
       * of removing and adding elements
       * otherwise, it will shift all elements
       * before the add/remove transitions are finished
       */
      rects
        .transition()
        .delay(300)
        .attr('x', (d: any) => x(d.x)!)
        .attr('y', (d: any) => y(d.y / 1000000))
        .attr('width', x.bandwidth)
        .attr('height', (d: any) => dimensions.height - y(d.y / 100000))
        .attr('fill', 'orange');

      rects
        .enter()
        .append('rect')
        .attr('x', (d: any) => x(d.x)!)
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .transition()
        .delay(400)
        .duration(500)
        .ease(easeElastic)
        .attr('height', (d: any) => dimensions.height - y(d.y / 1000000))
        .attr('y', (d: any) => y(d.y))
        .attr('fill', 'orange');
    }
  }, [newData]);

  /**
   * functions to help add and remove elements to show transitions
   */

  return (
    <>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </>
  );
};

export default Transition;
