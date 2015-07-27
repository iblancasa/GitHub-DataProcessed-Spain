var char;

$(document).ready(function(){
  var cityName;
  var dates;
  var dataset = [];

  var max_cities = 5;

  var position=1;

  $.getJSON( "https://raw.githubusercontent.com/iblancasa/GitHub-DataProcessed-Spain/master/totalContributionsPopulation.json",
    function( data ) {
      for(i = 0; i < data.length; i++ ){
        cityName = data[i][0];
        date = data[i][1][0];
        date = Object.keys(date)[0];
        position = i+1;

        $("#contributions").
          append("<tr><td>"+position+"</td><td>"+cityName+"</td><td>"+data[i][1][0][date]+"</td></tr>");
      }

      var labels = [];

      for (i = 0; i< data[0][1].length; i++){
         labels.push(Object.keys(data[0][1][i]));
      }

      var data_Contrib=[];


      var color;

      for (i = 0; i<max_cities;i++){
        color = "";

        for (var k = 0; k < 3; k++ ) {
            color += Math.floor(Math.random() * 255);
            color +=","
        }
        for(var contrib in data[i][1]){
          for(var c in data[i][1][contrib]){
            data_Contrib.push(data[i][1][contrib][c]);
          }
        }
        console.log(color);

        data_Contrib = data_Contrib.reverse();

        dataset.push({
            label: data[i][0],
            fillColor: "rgba("+color+"0.2)",
            strokeColor: "rgba("+color+"1)",
            pointColor: "rgba("+color+"1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data_Contrib
        });

        $("#legend").
          append("<tr><td style='background-color:rgba("+color+"1);'></td><td>"+data[i][0]+"</td></tr>");

        data_Contrib=[];
      }


      var data = {
            labels: labels.reverse(),
            datasets: dataset
        };



        var options = {
                scaleShowGridLines : true,
                scaleGridLineColor : "rgba(0,0,0,.05)",
                scaleGridLineWidth : 1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                bezierCurve : true,
                bezierCurveTension : 0.4,
                pointDot : true,
                pointDotRadius : 4,
                pointDotStrokeWidth : 1,
                pointHitDetectionRadius : 20,
                datasetStroke : true,
                datasetStrokeWidth : 2,
                datasetFill : true,

            };
        var ctx = $("#char").get(0).getContext("2d");

        char = new Chart(ctx).Line(data, options);


    });

});
