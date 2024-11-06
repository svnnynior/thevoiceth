d3.queue()
    .defer(d3.csv, "../data/pickratesex.csv")
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

  drawPickRateSex_Kong(data_kong)
  drawPickRateSex_Joey(data_joey)
  drawPickRateSex_Kim(data_kim)
  drawPickRateSex_Stamp(data_stamp)
  drawPickRateSex_Singto(data_singto)
  drawPickRateSex_Da(data_da)

}

function drawPickRateSex_Kong(data){

  var svg_graph3 = d3.select("#chartPickRateSex_Kong").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph3 = svg_graph3.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph3.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph3.node().getBoundingClientRect(),
    width = bounds.width - margin.left - margin.right,
    height = bounds.height - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph3()
  d3.select(window).on('resize', draw_inside_graph3)

  function draw_inside_graph3(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph3.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text = g_graph3.append("g")

    var bars = g_bar_text.selectAll("rect").data(data)
    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#F1948A'
        }else if(d.Sexuality === 'Female'){
          return '#74B4ED'
        }else{
          return '#F1948A'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateSex_Joey(data){

  var svg_graph_sex_joey = d3.select("#chartPickRateSex_Joey").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_sex_joey = svg_graph_sex_joey.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_sex_joey.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_sex_joey.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph_sex_joey()
  d3.select(window).on('resize', draw_inside_graph_sex_joey)

  function draw_inside_graph_sex_joey(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])


    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_sex_joey.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_joey = g_graph_sex_joey.append("g")

    var bars = g_bar_text_joey.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#74B4ED'
        }else if(d.Sexuality === 'Female'){
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
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateSex_Kim(data){

  var svg_graph_sex_kim = d3.select("#chartPickRateSex_Kim").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_sex_kim = svg_graph_sex_kim.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_sex_kim.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_sex_kim.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph_sex_kim()
  d3.select(window).on('resize', draw_inside_graph_sex_kim)

  function draw_inside_graph_sex_kim(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])


    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_sex_kim.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_kim = g_graph_sex_kim.append("g")

    var bars = g_bar_text_kim.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#F1948A'
        }else if(d.Sexuality === 'Female'){
          return '#74B4ED'
        }else{
          return '#74B4ED'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text_kim.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateSex_Stamp(data){

  var svg_graph_sex_stamp = d3.select("#chartPickRateSex_Stamp").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_sex_stamp = svg_graph_sex_stamp.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_sex_stamp.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_sex_stamp.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph_sex_stamp()
  d3.select(window).on('resize', draw_inside_graph_sex_stamp)

  function draw_inside_graph_sex_stamp(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])


    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_sex_stamp.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_stamp = g_graph_sex_stamp.append("g")

    var bars = g_bar_text_stamp.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#F1948A'
        }else if(d.Sexuality === 'Female'){
          return '#74B4ED'
        }else{
          return '#74B4ED'
        }
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.percentage) })

    var texts = g_bar_text_stamp.selectAll("text").data(data)
    // ENTER
    texts.enter().append("text")
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateSex_Singto(data){

  var svg_graph_sex_singto = d3.select("#chartPickRateSex_Singto").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_sex_singto = svg_graph_sex_singto.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_sex_singto.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_sex_singto.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph_sex_singto()
  d3.select(window).on('resize', draw_inside_graph_sex_singto)

  function draw_inside_graph_sex_singto(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])


    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_sex_singto.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_singto = g_graph_sex_singto.append("g")

    var bars = g_bar_text_singto.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#74B4ED'
        }else if(d.Sexuality === 'Female'){
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
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}

function drawPickRateSex_Da(data){

  var svg_graph_sex_da = d3.select("#chartPickRateSex_Da").append("svg")
  
  var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear()

  var g_graph_sex_da = svg_graph_sex_da.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  g_graph_sex_da.append("g")
    .attr("class", "axis axis--x")

  var bounds = svg_graph_sex_da.node().getBoundingClientRect(),
    width = 300 - margin.left - margin.right,
    height = 156 - margin.top - margin.bottom

  x.domain(data.map(function (d) { return d.Sexuality }))
  y.domain([0, 50])

  draw_inside_graph_sex_da()
  d3.select(window).on('resize', draw_inside_graph_sex_da)

  function draw_inside_graph_sex_da(){
    x.rangeRound([0, width])
    y.rangeRound([height, 0])

    var xAxis = d3.axisBottom(x)

    function customXAxis(g) {
      g.call(xAxis);
      g.selectAll(".tick text").style("fill", "white")
    }
    
    g_graph_sex_da.select(".axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis)

    var g_bar_text_da = g_graph_sex_da.append("g")

    var bars = g_bar_text_da.selectAll("rect").data(data)

    // ENTER
    bars.enter().append("rect")
      .attr("class", "bars")
      .attr("x", function (d) { return x(d.Sexuality) })
      .attr("y", function (d) { return y(d.percentage) })
      .style("fill", function(d){ 
        if (d.Sexuality === 'Male'){
          return '#74B4ED'
        }else if(d.Sexuality === 'Female'){
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
      .attr("x", function (d) { return x(d.Sexuality) + 20})
      .attr("y", function (d) { return y(d.percentage) - 5})
      .style("margin-bottom", "10")
      .style("fill", 'white')
      .text(function(d){return d.percentage})

    }

}
