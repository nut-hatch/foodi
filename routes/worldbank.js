var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res) {
  var country = req.query.country;
  var country_code = '';
  
  var efficiency = 0;
  var sustainability = 0;
  var capacity = 0;
  
  var fertilizer_consumption;
  var agricultural_methane_emission;
  var arable_land;
  var cerealyields;
  var overall_export;
  var overall_import;
  
  var country_codes = {
    Finland : 'FIN',
    India : 'IND',
    Congo : 'COG',
    Australia : 'AUS',
  }
  country_code = country_codes[country];
  
  var fertilizerRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/AG.CON.FERT.ZS?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  var methaneRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/EN.ATM.METH.AG.ZS?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  var arableRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/AG.LND.ARBL.ZS?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  /*var totalLandRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/AG.LND.ARBL.ZS?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };*/
  
  var exportRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/TX.QTY.MRCH.XD.WD?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  var importRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/TM.QTY.MRCH.XD.WD?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  var cerealyieldsRequest = {
    uri: "http://api.worldbank.org/countries/"+country_code+"/indicators/TM.QTY.MRCH.XD.WD?per_page=10&date=2010:2015&format=json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  };
  
  request(cerealyieldsRequest, function(error, data, body) {
    var response = JSON.parse(body);
    var values = response[1];
    var arrayLength = values.length;
    for (var i = 0; i < arrayLength; i++) {
      if (values[i].value) {
        cerealyields = values[i].value;
        break;
      }
    }
    console.log(cerealyields);
    efficiency = cerealyields * 100 / 3600;
    efficiency = (efficiency > 10) ? 10 : efficiency;
          console.log("EFFICIENCY");
    console.log(efficiency);
    request(fertilizerRequest, function(error, data, body) {
      response = JSON.parse(body);
      values = response[1];
      arrayLength = values.length;
      for (var i = 0; i < arrayLength; i++) {
        if (values[i].value) {
          fertilizer_consumption = values[i].value;
          break;
        }
      }
      var fert_cons_avg = 370;
      if (fertilizer_consumption < (fert_cons_avg/2)) {
        sustainability = sustainability + 5;
      }
      if ((fertilizer_consumption >= (fert_cons_avg/2)) && (fertilizer_consumption <= fert_cons_avg)) {
        sustainability = sustainability + 2;
      }
      if (fertilizer_consumption > fert_cons_avg) {
        sustainability = sustainability + 0;
      }
      console.log(fertilizer_consumption);
      request(methaneRequest, function(error, data, body) {
        response = JSON.parse(body);
        values = response[1];
        arrayLength = values.length;
        for (var i = 0; i < arrayLength; i++) {
          if (values[i].value) {
            agricultural_methane_emission = values[i].value;
            break;
          }
        }
        
        var meth_emis_avg = 43;
        if (agricultural_methane_emission < (meth_emis_avg/2)) {
          sustainability = sustainability + 5;
        }
        if ((agricultural_methane_emission >= (meth_emis_avg/2)) && (agricultural_methane_emission <= meth_emis_avg)) {
          sustainability = sustainability + 2;
        }
        if (agricultural_methane_emission > meth_emis_avg) {
          sustainability = sustainability + 0;
        }
        
        console.log(agricultural_methane_emission);
          console.log("SUSTAINABILITY");
        console.log(sustainability);
        request(arableRequest, function(error, data, body) {
          response = JSON.parse(body);
          values = response[1];
          arrayLength = values.length;
          for (var i = 0; i < arrayLength; i++) {
            if (values[i].value) {
              arable_land = values[i].value;
              break;
            }
          }
          console.log(arable_land);
          capacity = ((arable_land / 5) > 10) ? 10 : (arable_land / 5);
          console.log("CAPACITY");
          console.log(capacity);
          efficiency = Math.round(efficiency*100)/100;
          sustainability = Math.round(sustainability*100)/100;
          capacity = Math.round(capacity*100)/100;
          res.send({efficiency:efficiency, sustainability:sustainability, capacity:capacity});
        });
      });
    });
    /*res.app.render('listproducts', {layout: false, products: data.results}, function(err, html){
      if (err) {
        console.log(err);
      }
      //console.log(html);
      res.send(html);
    });*/
  });
});

module.exports = router;