
    //------------------------1. PREPARATION-------------------------//
    //-----------------------------SVG-------------------------------// 
    
    const width = 820;
    const height = 180;
    const margin = 5;
    const padding = 5;
    const adj = 30;
     // we are appending SVG first 
    const svg = d3.select("#chart_div").append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "-"
        + adj + " -"
        + adj + " "
        + (width + adj * 3) + " "
        + (height + adj * 3))
      .style("padding", padding)
      .style("margin", margin)
      .classed("svg-content", true);

    const timeConv = d3.timeParse("%d-%b-%Y");
 //-----------------------------DATA------------------------------// 
    const data = [
      { x: dayjs("2021-01-31T00:00:00.000").valueOf(), y: 0.7 },
      { x: dayjs("2021-02-01T00:00:00.000").valueOf(), y: 1.7 },
      { x: dayjs("2021-02-02T00:00:00.000").valueOf(), y: 0.5 },
      { x: dayjs("2021-02-03T00:00:00.000").valueOf(), y: 3 },
      { x: dayjs("2021-02-04T00:00:00.000").valueOf(), y: 0.75 },
      { x: dayjs("2021-02-05T00:00:00.000").valueOf(), y: 1.5 },
      { x: dayjs("2021-02-06T00:00:00.000").valueOf(), y: 2.7 },
      { x: dayjs("2021-02-07T00:00:00.000").valueOf(), y: 1.2 },
    ];

     //----------------------------SCALES-----------------------------// 

    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    
    xScale.domain(d3.extent(data, d => d.x));
    yScale.domain([0, d3.max(data, d => d.y)]);

     //-----------------------------AXES------------------------------// 

    const yaxis = d3.axisLeft()
       //.ticks(20, "s") 
      .tickValues([0, 0.75, 1.5, 2.25, 3])
      .tickFormat(v => v )
      .tickPadding(10)
      .tickSize(-width)
      .scale(yScale);

    const xaxis = d3.axisBottom()
      //.ticks(d3.timeDay.every(1)) 
      //.ticks(data.length)
      .tickValues(data.map(point => point.x))
      .tickFormat((v) => dayjs(v).format("DD/MM"))
      .tickSize(-height)
      .tickPadding(10)
      .scale(xScale);

    svg.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);
    
    svg.append("g")
        .attr("class", "axis axis-y")
        .call(yaxis)
        .selectAll("g.axis.axis-y > g.tick")
        .classed("unactive", (d, i) => i % 2 !== 0)

     //----------------------------LINES------------------------------// 

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX)
    (data);

    svg.append("g")
      .attr("class", "lines")
      .append("path")
      .attr("d", line);
    
    svg.append("g")
      .attr("class", "points")
      .selectAll("g.points > circle.point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 3)

      
    