d3.queue()
    .defer(d3.csv, "../data/avgpergenre.csv")
    .await(ready)

function ready(error, data) {
  if (error) throw error

  drawAvgPerGenre(data)

}

function drawAvgPerGenre(data){

  var svg_graph_avg_per_genre = d3.select("#chartAvgCoachPerGenre").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_avg_per_genre = svg_graph_avg_per_genre.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_avg_per_genre.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_avg_per_genre.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.genre }))
  y.domain([0, 2])

  draw_inside_graph_avg_per_genre()
  d3.select(window).on('resize', draw_inside_graph_avg_per_genre)

  function draw_inside_graph_avg_per_genre(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_avg_per_genre.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_avg_per_genre = g_graph_avg_per_genre.append("g")

    var bars = g_bar_text_avg_per_genre.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.genre) })
      .attr("y", function (d) { return y(d.avg_num_coach) })
      .style("fill", function(d){ 
        if (d.genre === '3') return '#F1948A'
        else return '#74B4ED'
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.avg_num_coach) })

    var texts = g_bar_text_avg_per_genre.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.genre) + 8})
      .attr("y", function (d) { return y(d.avg_num_coach) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.avg_num_coach})

    }

}
