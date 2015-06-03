var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res) {
  var country = req.query.country;
var australia_import = [
      ['Australia', 0],
      ['China', 18],
      ['United States', 12],
      ['Japan', 8.2],
      ['Singapore', 5.6],
      ['Germany', 5.0],
      ['France', 4.6],
  ];
var australia_export = [
      ['Australia', 0],
      ['China', 29],
      ['Japan', 20],
      ['South Korea', 8.4],
      ['India', 5.3],
      ['United States', 3.6],
      ['Bangladesh', 2.8],
  ];

var india_import = [
      ['India', 0],
      ['China', 11],
      ['United Arab Emirates', 7.5],
      ['Saudi Arabia', 6.5],
      ['Switzerland', 6.2],
      ['United States', 4.2],
      ['Russia', 3.2],
  ];
var india_export = [
      ['India', 0],
      ['United States', 12],
      ['United Arab Emirates', 12],
      ['China', 5.8],
      ['Singapore', 4.5],
      ['United Kingdom', 3.3],
      ['Germany', 2.8],
  ];

var congo_import = [
      ['Corgo', 0],
      ['France', 19],
      ['China', 14],
      ['Brazil', 9.4],
      ['India', 5.9],
      ['Italy', 5.1],
      ['Pakistan', 2.2],
  ];
var congo_export = [
      ['Corgo', 0],
      ['China', 49],
      ['France', 12],
      ['Australia', 10],
      ['Spain', 6.9],
      ['India', 6.9],
      ['Germany', 4.8],
  ];

var finland_import = [
      ['Finland', 0],
      ['Russia', 16],
      ['Germany', 13],
      ['Sweden', 10],
      ['China', 8.3],
      ['Netherlands', 6.0],
      ['Norway', 3.3],
  ];
var finland_export = [
      ['Finland', 0],
      ['Sweden', 11],
      ['Germany', 9.3],
      ['Russia', 9.0],
      ['United States', 6.8],
      ['Netherlands', 6.0],
      ['Denmark', 4.8],
  ];
  var india = {
    country : 'India',
    import_values : india_import,
    export_values : india_export
  };
  var australia = {
    country : 'Australia',
    import_values : australia_import,
    export_values : australia_export
  };
  var congo = {
    country : 'Congo',
    import_values : congo_import,
    export_values : congo_export
  };
  var finland = {
    country : 'Finland',
    import_values : finland_import,
    export_values : finland_export
  };
  var data = {
      India : india,
      Australia : australia,
      Congo : congo,
      Finland : finland
  };
  /*request({
        uri: "",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        var data = JSON.parse(data);
        /*res.app.render('listproducts', {layout: false, products: data.results}, function(err, html){
          if (err) {
            console.log(err);
          }
          //console.log(html);
          res.send(html);
        });
        res.send('respond with a resource');
    });*/
    res.send(data[country]);
});

module.exports = router;
