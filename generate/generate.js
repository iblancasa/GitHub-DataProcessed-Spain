var fs = require('fs'),
    ejs = require("ejs");


function ejs2html(name, information) {
  str = fs.readFileSync("./sections/"+name+".ejs", 'utf8');
  information['filename'] = "./sections/"+name+".ejs";
  ret = ejs.render(str,information);

  fs.writeFile("../"+name+".html", ret, function (err) {
    if (err) return console.log(err);
    console.log(name + " generated");
  });
}

files = {};

files['index'] = {title: "Home - GitHub Processed Data Ranking"};
files['languagesspain'] = {title: "Languages in Spain - GitHub Processed Data Ranking"};
files['totalcontributions'] = {title: "Total contributions - GitHub Processed Data Ranking"};
files['totalcontributionspopulation'] = {title: "Total contributions population - GitHub Processed Data Ranking"};
files['contributionsweek'] = {title: "Contributions in week - GitHub Processed Data Ranking"};

for(var i in files){
  ejs2html(i,files[i]);
}
