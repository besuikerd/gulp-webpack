var fs = require('fs');
var path = require('path');

var examples = module.exports = {};
var examplePath = path.join(__dirname, '../../examples');

if(fs.existsSync(examplePath)){
  fs.readdirSync(path.join(__dirname, '../../examples')).forEach(function(exampleName){
    examples[exampleName] = './examples/' + exampleName;
  });
}
