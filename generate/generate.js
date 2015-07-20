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

ejs2html("index",files['index']);

ejs2html("languagesspain",files['languagesspain']);
