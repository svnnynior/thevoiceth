d3.queue()
    .defer(d3.csv, "../data/overview.csv")
    .await(ready)

function ready(error, data) {
  if (error) throw error

  drawChart1(data)
  drawChart2(data)

}

// Number of Victim Group by Offender Race
function drawChart1(data){
    
  var name = data.map(d => d.Coach)

  var svg_graph1 = d3.select("#graph-1").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph1 = svg_graph1.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph1.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph1.node().getBoundingClientRect(),
    width = bounds.width - margin.left - margin.right,
    height = bounds.height - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Coach }))
  y.domain([0, d3.max(data, function (d) { return d.NumSeason })])

  draw_inside_graph1()
  d3.select(window).on('resize', draw_inside_graph1)

  function draw_inside_graph1(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph1.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text = g_graph1.append("g")

    var bars = g_bar_text.selectAll("rect").data(data)
    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Coach) })
      .attr("y", function (d) { return y(d.NumSeason) })
      .style("fill", function(d){ 
        if (d.NumSeason === '6'){
          return '#F1948A'
        }else{
          return '#74B4ED'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.NumSeason) })


    var texts = g_bar_text.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.Coach) + 25})
      .attr("y", function (d) { return y(d.NumSeason) - 5 })
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.NumSeason})

    }

}

// Number of Offender Group by Offender Race
function drawChart2(data){

  var name = data.map(d => d.Coach)

  var svg_graph2 = d3.select("#graph-2").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph2 = svg_graph2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph2.append("g")
    .attr("class", "axis axis--x")


  var bounds = svg_graph2.node().getBoundingClientRect(),
    width = bounds.width - margin.left - margin.right,
    height = bounds.height - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Coach }))
  y.domain([0, d3.max(data, function (d) { return d.Win })])

  draw_inside_graph2()
  d3.select(window).on('resize', draw_inside_graph2)

  function draw_inside_graph2(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph2.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)



    var g_bar_text = g_graph2.append("g")

    var bars = g_bar_text.selectAll("rect").data(data)
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Coach) })
      .attr("y", function (d) { return y(d.Win) })
      .style("fill", function(d){ 
        if (d.Win === '2'){
          return '#F1948A'
        }else{
          return '#74B4ED'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.Win) })


    var texts = g_bar_text.selectAll("text").data(data)
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.Coach) + 25})
      .attr("y", function (d) { return y(d.Win) - 5 })
      .style("fill", 'white')
      .style("margin-bottom", "10")
      .text(function(d){return d.Win})

    }

}

