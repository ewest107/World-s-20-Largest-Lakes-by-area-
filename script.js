d3.csv("./data/World's-Largest-Lakes.csv").then(function(data) {

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 25, left: 100, right: 25, bottom: 100};

    const canvas = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


        const Area = {
            min: d3.min(data, function(d) { return +d.lakeArea; }),
            max: d3.max(data, function(d) { return +d.lakeArea; })
        };

        const Volume = {
            min: d3.min(data, function(d) { return +d.Volume; }),
            max: d3.max(data, function(d) { return +d.Volume; })
        };

        const maxDepth = {
            min: d3.min(data, function(d) { return +d.maxDepth; }),
            max: d3.max(data, function(d) { return +d.maxDepth; })
        };


        const xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.Name; }))
        .range([margin.left, width-margin.right])
        .padding(0.5);

        const yScale = d3.scaleLinear()
        .domain([Area.min, Area.max])
        .range([height-margin.bottom, margin.top]);

        const colorScale = d3.scaleOrdinal(d3.schemeDark2)
        .domain(["North America", "Africa", "Eurasia", "Asia", "Europe", "Antarctica", "South America"]);

        const Salt = d3.scaleOrdinal()
        .domain(["Salt", "Variable", "Fresh"])
        .range([margin.top, ((height-margin.bottom)/2), ((.9*height)-margin.bottom)]);

        let tickLabels = ["Salt", "Variable", "Fresh"];


        let bars = canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.Name); })
            .attr("y", function(d) { return yScale(d.lakeArea); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.lakeArea); })
            .attr("fill", function(d) { return colorScale(d.Continent)})
            .attr("opacity", ".8");



        const xAxis = canvas.append("g")
            .attr("class","axis")
            .attr("transform",`translate(0, ${height-margin.bottom})`)
            .call(d3.axisBottom().scale(xScale));

        const yAxis = canvas.append("g")
            .attr("class","axis")
            .attr("transform",`translate(${margin.left},0)`)
            .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("")));

        const xAxisLabel = canvas.append("text")
            .attr("class","axisLabel")
            .attr("x", width/2)
            .attr("y", height-margin.bottom/2)
            .attr("text-anchor","middle")
            .attr("id", "label")
            .text("Lake Name");

        const yAxisLabel = canvas.append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-height/2)
            .attr("y",margin.left/2)
            .attr("text-anchor","middle")
            .attr("id", "label")
            .text("Area (Square Miles)");

            const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

            bars
            .on("mouseover", function(e, d) {
                
                d3.select(this)
                    .attr("opacity", 1);

                tooltip.style("visibility", "visible")
                    .html(`<b>Did You Know:</b> ${d.fact}
                    <br><br><b>Continent:</b>${d.Continent}`);
            })
            
            .on("mouseout", function() {
                tooltip.style("visibility", "hidden")
        
                d3.select(this)
                    .attr("opacity", 0.8);
            });


            d3.select("#volume").on("click", function() {


                    yScale.domain([Volume.min, Volume.max]);
                    yScale.range([height-margin.bottom, margin.top]);

                    let vol = canvas.selectAll("rect")
                    .data(data);
        
                    vol.enter()
        
                        .merge(vol)
                            .transition()
                            .duration(1000)
                            .delay(250)
                        .attr("y", function(d) { return yScale(d.Volume); })
                        .attr("height", function(d) { return height - margin.bottom - yScale(d.Volume); });

                    yAxisLabel
                    .text("Volume (Cubic Miles)");

                    yAxis
                    .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("")));

                    });

            d3.select("#maxDepth").on("click", function() {


                yScale.domain([maxDepth.min, maxDepth.max]);
                yScale.range([height-margin.bottom, margin.top]);
    
                let vol = canvas.selectAll("rect")
                    .data(data);
            
                    vol.enter()
            
                    .merge(vol)
                        .transition()
                        .duration(1000)
                        .delay(250)
                        .attr("y", function(d) { return yScale(d.maxDepth); })
                        .attr("height", function(d) { return height - margin.bottom - yScale(d.maxDepth); });
            
                        yAxisLabel
                        .text("Maximum Depth (Feet)");

                        yAxis
                    .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("")));
    
                        });


            d3.select("#salinity").on("click", function() {

                let vol = canvas.selectAll("rect")
                    .data(data);
            
                    vol.enter()
            
                    .merge(vol)
                        .transition()
                        .duration(1000)
                        .delay(250)
                        .attr("y", function(d) { return Salt(d.Salinity); })
                        .attr("height", function(d) { return height - margin.bottom - Salt(d.Salinity); });

                        yAxisLabel
                        .text("Salinity");

                        yAxis
                    .call(d3.axisLeft().scale(Salt).tickFormat((d,i) => tickLabels[i])  );

            });

            d3.select("#area").on("click", function() {

                yScale
                .domain([Area.min, Area.max])
                .range([height-margin.bottom, margin.top]);

                let vol = canvas.selectAll("rect")
                    .data(data);
            
                    vol.enter()
            
                    .merge(vol)
                        .transition()
                        .duration(1000)
                        .delay(250)
                        .attr("y", function(d) { return yScale(d.lakeArea); })
                        .attr("height", function(d) { return height - margin.bottom - yScale(d.lakeArea); })
        
                        yAxisLabel
                        .text("Area (Square Miles)");

                        yAxis
                    .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("")));
    
                        });
            
});