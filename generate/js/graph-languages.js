/**
* Takes this JSON https://raw.githubusercontent.com/iblancasa/GitHub-DataProcessed-Spain/master/spanishLanguages.json
* and creates a graph
*/

$(document).ready(function(){
  $.getJSON("https://raw.githubusercontent.com/iblancasa/GitHub-DataProcessed-Spain/master/spanishLanguages.json",
    function( data ) {

      var developers = 0;
      for(i = 0; i < data.length; i++){
        developers += data[i][1];//Total developers
      }

      var languages = [];
      var others = 0;
      var min = 30;
      var char_data = [];
      var letters = '0123456789ABCDEF'.split('');
      var color = "#";

      for(i = 0; i < data.length; i++){
        if(data[i][1]>=min){//Will be in the graph
          for (var k = 0; k < 6; k++ ) {//Random color
              color+= letters[Math.floor(Math.random() * 16)];
          }

          char_data.push({
            value: (data[i][1]/developers*100).toFixed(2),
            color:color,
            label: data[i][0]
          });
        }
        else{
          others+=data[i][1];
        }

         color="#";
      }


      for (var k = 0; k < 6; k++ ) {
          color+= letters[Math.floor(Math.random() * 16)];
      }

      char_data.push({
        value: (others/developers*100).toFixed(2),
        color:color,
        label: "Others"
      });


      var options = {
          segmentShowStroke : true,
          segmentStrokeColor : "#fff",
          segmentStrokeWidth : 2,
          percentageInnerCutout : 0,
          animationSteps : 100,
          animationEasing : "easeOutQuart",
          animateRotate : true,
      }

      var ctx = $("#graph").get(0).getContext("2d");
      var myPieChart = new Chart(ctx).Pie(char_data,options);
    });


});
