d3.queue()
    .defer(d3.csv, "../data/pickrateage.csv")
    .await(ready)

function ready(error, data) {
  if (error) throw error

  var data_kong, data_stamp, data_da, data_kim, data_joey, data_singto

  data_kong = data.filter(data => data.Coach === 'Kong')
  data_kim = data.filter(data => data.Coach === 'Kim')
  data_stamp = data.filter(data => data.Coach === 'Stamp')
  data_joey = data.filter(data => data.Coach === 'Joey')
  data_singto = data.filter(data => data.Coach === 'Singto')
  data_da = data.filter(data => data.Coach === 'Da')

  drawPickRateAge_Kong(data_kong)
  drawPickRateAge_Joey(data_joey)
  drawPickRateAge_Kim(data_kim)
  drawPickRateAge_Stamp(data_stamp)
  drawPickRateAge_Singto(data_singto)
  drawPickRateAge_Da(data_da)

}

function drawPickRateAge_Kong(data){

  var svg_graph4 = d3.select("#chartPickRateAge_Kong").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph4 = svg_graph4.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph4.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph4.node().getBoundingClientRect(),
    width = bounds.width - margin.left - margin.right,
    height = bounds.height - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.age }))
  y.domain([0, 50])

  draw_inside_graph4()
  d3.select(window).on('resize', draw_inside_graph4)

  function draw_inside_graph4(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph4.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text = g_graph4.append("g")

    var bars = g_bar_text.selectAll("rect").data(data)
    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.age) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        return '#74B4ED'
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.age) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}
function drawPickRateAge_Stamp(data){

    var svg_graph_age_stamp = d3.select("#chartPickRateAge_Stamp").append("svg")
    
    var margin = { top: 20, right: 20, bottom: 30, left: 20 },
      x = d3.scaleBand().padding(0.1),
      y = d3.scaleLinear()
  
    var g_graph_age_stamp = svg_graph_age_stamp.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
    g_graph_age_stamp.append("g")
      .attr("class", "axis axis--x")
  
    var bounds = svg_graph_age_stamp.node().getBoundingClientRect(),
      width = 300 - margin.left - margin.right,
      height = 156 - margin.top - margin.bottom
  
    x.domain(data.map(function (d) { return d.age }))
    y.domain([0, 60])
  
    draw_inside_graph_age_stamp()
    d3.select(window).on('resize', draw_inside_graph_age_stamp)
  
    function draw_inside_graph_age_stamp(){
      x.rangeRound([0, width])
      y.rangeRound([height, 0])
  
      var xAxis = d3.axisBottom(x)
  
      function customXAxis(g) {
        g.call(xAxis);
        g.selectAll(".tick text").style("fill", "white")
      }
      
      g_graph_age_stamp.select(".axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(customXAxis)
  
      var g_bar_text_stamp = g_graph_age_stamp.append("g")
  
      var bars = g_bar_text_stamp.selectAll("rect").data(data)
  
      // ENTER
      bars.enter().append("rect")
        .attr("class", "bars")
        .attr("x", function (d) { return x(d.age) })
        .attr("y", function (d) { return y(d.percentage) })
        .style("fill", function(d){ 
          if (d.age === '>40') return '#F1948A'
          else return '#74B4ED'
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.percentage) })
  
      var texts = g_bar_text_stamp.selectAll("text").data(data)
      // ENTER
      texts.enter().append("text")
        .attr("x", function (d) { return x(d.age) + 20})
        .attr("y", function (d) { return y(d.percentage) - 5})
        .style("margin-bottom", "10")
        .style("fill", 'white')
        .text(function(d){return d.percentage})
  
      }
  
  }

function drawPickRateAge_Kim(data){

  var svg_graph_age_kim = d3.select("#chartPickRateAge_Kim").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_age_kim = svg_graph_age_kim.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_age_kim.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_age_kim.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.age }))
  y.domain([0, 50])

  draw_inside_graph_age_kim()
  d3.select(window).on('resize', draw_inside_graph_age_kim)

  function draw_inside_graph_age_kim(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_age_kim.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_kim = g_graph_age_kim.append("g")

    var bars = g_bar_text_kim.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.age) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.age === '>40'){
          return '#74B4ED'
        }else{
          return '#F1948A'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text_kim.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.age) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateAge_Joey(data){

    var svg_graph_age_joey = d3.select("#chartPickRateAge_Joey").append("svg")
    
    var margin = { top: 20, right: 20, bottom: 30, left: 20 },
      x = d3.scaleBand().padding(0.1),
      y = d3.scaleLinear()
  
    var g_graph_age_joey = svg_graph_age_joey.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
    g_graph_age_joey.append("g")
      .attr("class", "axis axis--x")
  
    var bounds = svg_graph_age_joey.node().getBoundingClientRect(),
      width = 300 - margin.left - margin.right,
      height = 156 - margin.top - margin.bottom
  
    x.domain(data.map(function (d) { return d.age }))
    y.domain([0, 50])
  
    draw_inside_graph_age_joey()
    d3.select(window).on('resize', draw_inside_graph_age_joey)
  
    function draw_inside_graph_age_joey(){
      x.rangeRound([0, width])
      y.rangeRound([height, 0])
  
      var xAxis = d3.axisBottom(x)
  
      function customXAxis(g) {
        g.call(xAxis);
        g.selectAll(".tick text").style("fill", "white")
      }
      
      g_graph_age_joey.select(".axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(customXAxis)
  
      var g_bar_text_joey = g_graph_age_joey.append("g")
  
      var bars = g_bar_text_joey.selectAll("rect").data(data)
  
      // ENTER
      bars.enter().append("rect")
        .attr("class", "bars")
        .attr("x", function (d) { return x(d.age) })
        .attr("y", function (d) { return y(d.percentage) })
        .style("fill", function(d){ 
          if (d.age === '<23'){
            return '#F1948A'
          }else{
            return '#74B4ED'
          }
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.percentage) })
  
      var texts = g_bar_text_joey.selectAll("text").data(data)
      // ENTER
      texts.enter().append("text")
        .attr("x", function (d) { return x(d.age) + 20})
        .attr("y", function (d) { return y(d.percentage) - 5})
        .style("margin-bottom", "10")
        .style("fill", 'white')
        .text(function(d){return d.percentage})
  
      }
  
}
function drawPickRateAge_Singto(data){

    var svg_graph_age_singto = d3.select("#chartPickRateAge_Singto").append("svg")
    
    var margin = { top: 20, right: 20, bottom: 30, left: 20 },
      x = d3.scaleBand().padding(0.1),
      y = d3.scaleLinear()
  
    var g_graph_age_singto = svg_graph_age_singto.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
    g_graph_age_singto.append("g")
      .attr("class", "axis axis--x")
  
    var bounds = svg_graph_age_singto.node().getBoundingClientRect(),
      width = 300 - margin.left - margin.right,
      height = 156 - margin.top - margin.bottom
  
    x.domain(data.map(function (d) { return d.age }))
    y.domain([0, 50])
  
    draw_inside_graph_age_singto()
    d3.select(window).on('resize', draw_inside_graph_age_singto)
  
    function draw_inside_graph_age_singto(){
      x.rangeRound([0, width])
      y.rangeRound([height, 0])
  
      var xAxis = d3.axisBottom(x)
  
      function customXAxis(g) {
        g.call(xAxis);
        g.selectAll(".tick text").style("fill", "white")
      }
      
      g_graph_age_singto.select(".axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(customXAxis)
  
      var g_bar_text_singto = g_graph_age_singto.append("g")
  
      var bars = g_bar_text_singto.selectAll("rect").data(data)
  
      // ENTER
      bars.enter().append("rect")
        .attr("class", "bars")
        .attr("x", function (d) { return x(d.age) })
        .attr("y", function (d) { return y(d.percentage) })
        .style("fill", function(d){ 
          if (d.age === '<23'){
            return '#F1948A'
          }else{
            return '#74B4ED'
          }
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.percentage) })
  
      var texts = g_bar_text_singto.selectAll("text").data(data)
      // ENTER
      texts.enter().append("text")
        .attr("x", function (d) { return x(d.age) + 20})
        .attr("y", function (d) { return y(d.percentage) - 5})
        .style("margin-bottom", "10")
        .style("fill", 'white')
        .text(function(d){return d.percentage})
  
      }
  
}
function drawPickRateAge_Da(data){

  var svg_graph_age_da = d3.select("#chartPickRateAge_Da").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_age_da = svg_graph_age_da.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_age_da.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_age_da.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.age }))
  y.domain([0, 50])

  draw_inside_graph_age_da()
  d3.select(window).on('resize', draw_inside_graph_age_da)

  function draw_inside_graph_age_da(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_age_da.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_da = g_graph_age_da.append("g")

    var bars = g_bar_text_da.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.age) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.age === '23-30'){
          return '#F1948A'
        }else{
          return '#74B4ED'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text_da.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.age) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}
