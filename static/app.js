// Use the D3 library to read in samples.json.
function Plot(id) {
    d3.json("samples.json").then(function(sampledata){
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        //console.log(sampleValues)
    // get top 10 otu ids
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
        //console.log(`OTU IDS: ${OTU_id}`)
     // get top 10 otu labels
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        //console.log(`OTU_labels: ${labels}`)
        //bar plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'light blue'},
            type:"bar",
            orientation: "h",
        };
        
        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        
    Plotly.newPlot("bar", data, layout);

    //bubble chart
    var trace2 = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text:  sampledata.samples[0].otu_labels

    };

    var layout_2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
    };
 
    var data2 = [trace2];

    // create the bubble plot
    Plotly.newPlot("bubble", data2, layout_2); 
    });
}

function sampleMetadata(id) {
    // read the json file to get data
        d3.json("samples.json").then(function(data) {
            var metadata = data.metadata;
            //console.log(metadata)
    
          // filter metadata
           var result = metadata.filter(meta => meta.id.toString() === id)[0];

           var demographicInfo = d3.select("#sample-metadata");

           demographicInfo.html("");
    
         // append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then(function(data) {
        //console.log(data)

        // dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // display the data and the plots
        Plot(data.names[0]);
        sampleMetadata(data.names[0]);
    });
}

init();