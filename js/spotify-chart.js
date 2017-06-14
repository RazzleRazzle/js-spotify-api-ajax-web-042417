var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return (tracks.slice(0, 10))
}

function extractPopularity(tracks) {
    let popularity = tracks.map(track => track.popularity)
    return popularity
}

function extractNames(tracks) {
    let names = tracks.map(track => track.name)
    return names
}

// function extractPopularity(bigTracks) {
//   var pop = bigTracks.tracks.map(function(track) {
//     return (track["popularity"])
//   });
//   return(pop)
// }
//
// function extractNames(bigTracks) {
//   var names = bigTracks.tracks.map( function(track) {
//     return (track["name"])
//   });
//   return(names)
//}

function chartData(labels, inputData) {
    var arr = Object.assign({}, dataSetProperties, {'data':inputData});
    var myData = {labels: labels, datasets: [arr]};
    return myData
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received
  $.ajax({
      url: url,
      contentType: "application/json",
      dataType: 'json',
      type: 'GET',
      headers: {
          Authorization: 'BearBQA0342wjs-H3rkosH5HmjWjjYtZ5gUAXqqhxg2mmRN4fJ7cnRu4I9gh9dzkFb_AVScWcOmS82fSnSoT1imogy3c-fuPsRu5Tf2zR5AZD6c1FOKo3ymuN1Bd6B4LRG3zMHol55Yc22h_mmg'
      },
      success: callback
  })
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
    var topTracks = extractTop10Tracks(parsedJSON)
  //  2. extractNames -  pass it the result of #1
    var names = extractNames(parsedJSON)
  //  3. extractPopularity - pass it the result of #1
    var pop = extractPopularity(parsedJSON)
  //  4. chartData - pass it results of #2 and #3
    var chart = chartData(names, pop)
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
    var ctx = document.getElementById('spotify-chart').getContext('2d')
  //  6. make a new bar chart!
    var myChart = new Chart(ctx).Bar(data)
}
