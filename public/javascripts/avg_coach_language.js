d3.queue()
    .defer(d3.csv, "../data/avgperlang.csv")
    .await(ready)

function ready(error, data) {
  if (error) throw error

  drawAvgPerLanguage(data)

}

function drawAvgPerLanguage(data){

  var svg_graph_avg_per_language = d3.select("#chartAvgCoachPerLanguage").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_avg_per_language = svg_graph_avg_per_language.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_avg_per_language.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_avg_per_language.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.language }))
  y.domain([0, 2.5])

  draw_inside_graph_avg_per_language()
  d3.select(window).on('resize', draw_inside_graph_avg_per_language)

  function draw_inside_graph_avg_per_language(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_avg_per_language.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_avg_per_language = g_graph_avg_per_language.append("g")

    var bars = g_bar_text_avg_per_language.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.language) })
      .attr("y", function (d) { return y(d.avg_num_coach) })
      .style("fill", function(d){ 
        if (d.language === 'Thai') return '#74B4ED'
        else return '#F1948A'
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.avg_num_coach) })

    var texts = g_bar_text_avg_per_language.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.language) + 20})
      .attr("y", function (d) { return y(d.avg_num_coach) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.avg_num_coach})

    }

}
