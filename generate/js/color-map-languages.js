$(document).ready(function(){
  $("#map > svg").height( $("#map > svg").width()*0.83);
  $.getJSON( "https://raw.githubusercontent.com/iblancasa/GitHub-DataProcessed-Spain/master/languagesProvince.json",
    function( data ) {
        var languagesCities = {};
        var ceuta_melilla = {};

        for(i = 0; i < data.length; i++){
          if(regions[data[i][0]]!=undefined && data[i][0]!="Ceuta" && data[i][0]!="Melilla"){
            var languages = data[i][1];
            var high_language;
            var number=0;

            for(language in languages){
              if(languages[language] > number && language!=""){
                number = languages[language];
                high_language = language;
              }
            }

            if(languagesCities[high_language]==undefined){
              languagesCities[high_language]=[];
            }
            languagesCities[high_language].push(data[i][0]);
          }
          else if(data[i][0]=="Ceuta" || data[i][0]=="Melilla"){
            for (lang in data[i][1]){
              ceuta_melilla[lang] = data[i][1][lang];
            }
          }
        }

        var number = 0;
        var high_language;

        for(language in ceuta_melilla){
          if(ceuta_melilla[language] > number && language!=""){
            number = ceuta_melilla[language];
            high_language = language;
          }
        }

        if(languagesCities[high_language]==undefined){
          languagesCities[high_language]=[];
        }
        languagesCities[high_language].push("Ceuta y Melilla");


        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for(var language in languagesCities){
          for (var i = 0; i < 6; i++ ) {
              color += letters[Math.floor(Math.random() * 16)];
          }

          for(i = 0; i<languagesCities[language].length; i++){
            regions[languagesCities[language][i]].node.setAttribute("fill",color);
          }

          $("#leyend").
             append("<tr><td bgcolor="+color+"></td><td>"+ language +"</td></tr>");
          color = '#';
        }

        $("#leyend").
          append("<tr><td bgcolor='#ffffff'></td><td>Without data</td></tr>");
  });

});
