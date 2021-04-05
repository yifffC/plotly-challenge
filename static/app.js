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
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'light blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
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
        // create the bar plot
    Plotly.newPlot("bar", data, layout);

    });
}