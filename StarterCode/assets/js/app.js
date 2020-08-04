// @TODO: YOUR CODE HERE!
// step 1 copy the boiler plate from assignment 12 because its teh same as 
//the hw, thank god
var svgWidth = 1000;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everythingbelow
d3.csv("assets/data/data.csv").then(function(dataJ, err) {
    if (err) throw err;    
    //healthcare vs poverty
    //Moe/state necessary? remove if margin of error not needed
    // parse data
    dataJ.forEach(function(data) {
        data.poverty = +data.poverty;
      //data.povertyMoe = +data.povertyMoe;
        data.healthcare = +data.healthcare;
        //data.healthcareLow = +data.healthcareLow;
        //data.healthcareHigh = +data.healthcareHigh;
        data.state = +data.state;
    });

// Initial Params
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";
    // xLinearScale function above csv import

    //var xLinearScale = xScale(dataJ, chosenXAxis);
    //var yLinearScale = yScale(dataJ, chosenYAxis);

    //healthmin=d3.min(dataJ, function(data) {
        //return data.healthcare;
    //});

    
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(dataJ, d => d.poverty),
            d3.max(dataJ, d => d.poverty)
        ])
        .range([8, width]);
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(dataJ, d => d.healthcare),
            d3.max(dataJ, d => d.healthcare)
        ])
        .range([height, 0]);


 // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    // append y axis
    var yAxis = chartGroup.append("g") 
        .classed("y-axis", true)
    //.attr("transform", `translate(0, ${width})`) 
        .call(leftAxis);


 // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(dataJ)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.choseYAxis))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5");


    //---------------------------------------------------


    
// function used for updating circles group with a transition to
// new circles
    function renderCircles(circlesGroup, newXScale, chosenXAxis) {

        circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));
  
        return circlesGroup;
    }
// function used for updating circles group with new tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.healthcare}<br>${d.poverty} ${d[chosenXAxis]}`);
        });
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
      // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    }); 


  // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")   
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var healthcarelabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "healthcare") // value to grab for event listener
        .classed("active", true)
        .text("Hair Metal Ban Hair Length (inches)");

    var povertylabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "poverty") // value to grab for event listener
        .classed("inactive", true)
        .text("# of Albums Released");

  // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Healthcare vs Poverty");
});





//function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    //circlesGroup.transition()
     // .duration(1000)
     // .attr("cx", d => newXScale(d[chosenXAxis]));
  
   // return circlesGroup;
//}
















// function used for updating x-scale var upon click on axis label
//function xScale(dataJ, chosenXAxis) {
    // create scales
    //var xLinearScale = d3.scaleLinear()
      //.domain([d3.min(dataJ, d => d[chosenXAxis]) * 0.8,
        //d3.max(hairData, d => d[chosenXAxis]) * 1.2
      //])
      //.range([0, width]);
  
    //return xLinearScale;
//}

