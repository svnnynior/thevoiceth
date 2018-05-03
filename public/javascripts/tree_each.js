var Data =
{
  "name": "Genre",
  "children": [
    { 
      "name": "Alternative/Hip-Hop",
      "children": [{"name": "NO"}]
    },
    {
      "name": "Acoustic",
      "children": [
        {
         "name": "<23",
         "children":[{"name": "NO"}]
        },
        {
        "name": "23-30",
        "children": [{"name": "YES"}] 
        },
        {
         "name": ">30",
         "children":[
           {
             "name":"Female",
             "children":[{"name": "NO"}]
           },
           {
            "name": "Male",
            "children": [{"name": "YES"}]
           }
          ]
        }
      ]
    },
    {
      "name": "Jazz/Soul/Blues",
      "children": [{"name": "NO"}]
    },
    {
      "name": "Pop",
      "children": [
        {
          "name": "<23",
          "children": [{"name": "NO"}]
        },
        {
          "name": "23-30",
          "children": [
          {
            "name": "sexuality",
            "children": [
            {
              "name": "Female",
              "children": [{"name": "NO"}]
            },{
              "name": "Male",
              "children": [{
                "name": "language",
                "children": [
                {
                  "name": "English",
                  "children": [{"name": "YES"}]
                },{
                  "name": "Thailand",
                  "children": [{"name": "NO"}]
                }]
              }]
            },{
              "name": "Duo",
              "children": [{"name": "NO"}]
            }]
          }]
        },
        {
          "name": ">30",
          "children": [{"name": "NO"}]
        }
      ]
    },
    {
      "name": "R&B",
      "children": [{"name": "NO"}]
    },
    {
      "name": "Rock",
      "children": [{"name": "NO"}]
    },
    {
      "name": "Thai Country",
      "children": [{"name": "NO"}]
    }
  ]
};


// ready()
function ready(error) {
  if (error) throw error
  // console.log(data)
  // var data_kong, data_stamp, data_da, data_kim, data_joey, data_singto

  // data_kong = data.filter(data => data.Coach === 'Kim')
  // data_kim = data.filter(data => data.Coach === 'Kim')
  // data_stamp = data.filter(data => data.Coach === 'Stamp')
  // data_joey = data.filter(data => data.Coach === 'Joey')
  // data_singto = data.filter(data => data.Coach === 'Singto')
  // data_da = data.filter(data => data.Coach === 'Da')

  // drawDecisionTree_Kong(data_kong)
  // drawDecisionTree_Joey(data_joey)
  // drawDecisionTree_Kim(data_kim)
  // drawDecisionTree_Stamp(data_stamp)
  // drawDecisionTree_Singto(data_singto)
  // drawDecisionTree_Da(data_da)
  drawDecisionTree_Kim(Data)

}
// Collapse the node and all it's children
draw(Data)

function draw(treeData){
  // Set the dimensions and margins of the diagram
  var margin = {top: 20, right: 75, bottom: 30, left: 75},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#drawDecisionTree_Kim").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");

  var i = 0,
      duration = 750,
      root;

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function(d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse after the second level
  console.log('root')
  console.log(root)

  root.children.forEach(collapse);

  update(root);
  // Collapse the node and all it's children
  function collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 140});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1)
        .style("fill", function(d) {
            return d._children ? "#F7AEAE" : "#D8D8D8";
        });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -23 : 23;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; }).style("fill", "white");

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")";
       });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 20)
      .style("fill", function(d) {
          return d._children ? "#A9D6D9" : d.data.name == 'YES' ? '#71EBA8' : d.data.name == 'NO'?'#EB718B':"#A9D6D9";
      })
      .style("stroke", function(d){
        return d.data.name == 'YES' ? '#28985B' : d.data.name == 'NO' ? '#982828' : '#236266';
      } )
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
    }
  }

}