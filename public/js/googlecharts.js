
/*$(document).ready(function() {
      alert($("#trade_type").val());
  $('#trade_type').on("click", function() {
      alert($("#trade_type").val());
  });
});*/
google.load("visualization", "1", {packages:["geochart", 'corechart', 'bar']});
google.setOnLoadCallback(drawRegionsMap);
//google.setOnLoadCallback(drawMultSeries);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
    ['Country', $( "#trade_type option:selected" ).text(), {role:'tooltip'}],
    ['India', 0, ''],
    ['Finland', 0, ''],
    ['Australia', 0, ''],
    ['Congo', 0, ''],
    ['United Arab Emirates', 0, ''],
    ['Afghanistan', 0, ''],
    ['Antigua and Barbuda', 0, ''],
    ['Andorra', 0, ''],
    ['Albania', 0, ''],
    ['Armenia', 0, ''],
    ['Anguilla', 0, ''],
    ['Netherlands Antilles', 0, ''],
    ['Angola', 0, ''],
    ['Antarctica', 0, ''],
    ['Austria', 0, ''],
    ['Aland Islands', 0, ''],
    ['Aruba', 0, ''],
    ['Azerbaijan', 0, ''],
    ['Barbados', 0, ''],
    ['Bangladesh', 0, ''],
    ['Belgium', 0, ''],
    ['Burkina Faso', 0, ''],
    ['Belarus', 0, ''],
    ['Botswana', 0, ''],
    ['Bhutan', 0, ''],
    ['Bahamas', 0, ''],
    ['Brazil', 0, ''],
    ['Bolivia', 0, ''],
    ['Brunei', 0, ''],
    ['Brunei Darussalam', 0, ''],
    ['Bermuda', 0, ''],
    ['Saint Barthelemy', 0, ''],
    ['Benin', 0, ''],
    ['Burundi', 0, ''],
    ['Bahrain', 0, ''],
    ['Bulgaria', 0, ''],
    ['Denmark', 0, ''],
    ['Germany', 0, ''],
     ['Czech Republic', 0, ''],
     ['Cyprus', 0, ''],
     ['Cuba', 0, ''],
     ['Costa Rica', 0, ''],
     ['Colombia', 0, ''],
     ['China', 0, ''],
     ['Cameroon', 0, ''],
     ['Chile', 0, ''],
     ['Switzerland', 0, ''],
     ['Central African Republic', 0, ''],
     ['Cocos Islands', 0, ''],
     ['Canada', 0, ''],
    ['Belize', 0, ''],
    ['Ghana', 0, ''],
    ['Georgia', 0, ''],
    ['United Kingdom', 0, ''],
    ['France', 0, ''],
    ['Faroe Islands', 0, ''],
    ['Ethiopia', 0, ''],
    ['Spain', 0, ''],
    ['Egypt', 0, ''],
    ['Estonia', 0, ''],
    ['Ecuador', 0, ''],
    ['Sweden', 0, ''],
    ['Dominican Republic', 0, ''],
    ['Jamaica', 0, ''],
    ['Italy', 0, ''],
    ['Iceland', 0, ''],
    ['Iran', 0, ''],
    ['Iraq', 0, ''],
    ['India', 0, ''],
    ['Israel', 0, ''],
    ['Ireland', 0, ''],
    ['Indonesia', 0, ''],
    ['Hungary', 0, ''],
    ['Croatia', 0, ''],
    ['Greece', 0, ''],
    ['Greenland', 0, ''],
    ['Morocco', 0, ''],
    ['Latvia', 0, ''],
    ['Lithuania', 0, ''],
    ['Lebanon', 0, ''],
    ['Kazakhstan', 0, ''],
    ['Korea', 0, ''],
    ['Kyrgyzstan', 0, ''],
    ['Kenya', 0, ''],
    ['Japan', 0, ''],
    ['Jordan', 0, ''],
    ['Paraguay', 0, ''],
    ['Portugal', 0, ''],
    ['Poland', 0, ''],
    ['Pakistan', 0, ''],
    ['Peru', 0, ''],
    ['Panama', 0, ''],
    ['New Zealand', 0, ''],
    ['Nepal', 0, ''],
    ['Norway', 0, ''],
    ['Netherlands', 0, ''],
    ['Nigeria', 0, ''],
    ['Niger', 0, ''],
    ['Malaysia', 0, ''],
    ['Mexico', 0, ''],
    ['Mauritius', 0, ''],
    ['Macedonia', 0, ''],
    ['Madagascar', 0, ''],
    ['Qatar', 0, ''],
    ['Romania', 0, ''],
    ['Serbia', 0, ''],
    ['Russia', 0, ''],
    ['Saudi Arabia', 0, ''],
    ['Singapore', 0, ''],
    ['Sudan', 0, ''],
    ['Slovenia', 0, ''],
    ['Slovakia', 0, ''],
    ['Senegal', 0, ''],
    ['Uruguay', 0, ''],
    ['United States', 0, ''],
    ['Ukraine', 0, ''],
    ['Taiwan', 0, ''],
    ['Tanzania', 0, ''],
    ['Trinidad and Tobago', 0, ''],
    ['Turkey', 0, ''],
    ['Tunisia', 0, ''],
    ['Turkmenistan', 0, ''],
    ['Tajikistan', 0, ''],
    ['Thailand', 0, ''],
    ['Togo', 0, ''],
    ['Syria', 0, ''],
    ['Somalia', 0, ''],
    ['Zimbabwe', 0, ''],
    ['South Africa', 0, ''],
    ['Yemen', 0, ''],
    ['Zambia', 0, ''],
    ['Vietnam', 0, ''],
    ['Venezuela', 0, ''],
    ['Uzbekistan', 0, '']
  ]);
  /*var data = google.visualization.arrayToDataTable([
    ['Country'],
    ['India'],
    ['Australia'],
    ['Congo'],
    ['Finland'],
  ]);*/
  draw(data, true);
}

function draw(data, init) {
  console.log(data);
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  
  var options = {};
  if (init == true) {
    options.colorAxis = { colors : ["#F5F5F5", "#F5F5F5"] };
  } else if ($( "#trade_type option:selected" ).text() == 'Import') {
    options.colorAxis = {colors: ['yellow', '#00853f']};//'#00853f', 
  } else {
    options.colorAxis = {colors: ['yellow', '#e31b23']};
  }
  google.visualization.events.addListener(chart, 'select', selectHandler);

  function selectHandler(e) {
    //alert(chart.getSelection().toSource());
    var selection = chart.getSelection();
    var parameters = {
      country : data.getValue(selection[0].row, 0),
      is_trade_type_import : $("#trade_type").val()
    };
    $.get('/faostat/',parameters, function(data) {
      /*data = google.visualization.arrayToDataTable([
        ['Country', 'Value'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
      ]);*/
      //console.log(data);
      //console.log(data.import_values);
      
      var mapdata = [];
      console.log($( "#trade_type option:selected" ).text());
      if ($( "#trade_type option:selected" ).text() == 'Import') {
        mapdata = data.import_values;
      } else {
        mapdata = data.export_values;
      }
      mapdata.forEach(function(item) {
        item.push(item[1] + '% of ' + $( "#trade_type option:selected" ).text());
      });
      mapdata[0][2] = 'Selected Country';
      mapdata.unshift(['Country', $( "#trade_type option:selected" ).text(), {role:'tooltip'} ]);
      
      //console.log(mapdata);
      draw(google.visualization.arrayToDataTable(mapdata), false);
      $('#fb-comments').attr('data-href', 'https://spaceapp2015-niklaskolbe.c9.io/stories/' + parameters.country);
      FB.XFBML.parse();
      $("#index_title").html(parameters.country + " - Rating (0-10)")
      $.get('/worldbank/',parameters, function(data) {
        drawBarChart(data);
      });
      var img1 = '<img src="/img/'+parameters.country+'/'+$( "#trade_type option:selected" ).text()+'/1.png"></img>';
      var img2 = '<img src="/img/'+parameters.country+'/'+$( "#trade_type option:selected" ).text()+'/2.png"></img>';
      var img3 = '<img src="/img/'+parameters.country+'/'+$( "#trade_type option:selected" ).text()+'/3.png"></img>';
      var img4 = '<img src="/img/'+parameters.country+'/'+$( "#trade_type option:selected" ).text()+'/4.png"></img>';
      var img5 = '<img src="/img/'+parameters.country+'/'+$( "#trade_type option:selected" ).text()+'/5.png"></img>';
      $('#product_title').html(parameters.country+" top 5 "+ $( "#trade_type option:selected" ).text().toLowerCase() +" products");
      $('#product_images').html(img1+img2+img3+img4+img5);
    });

    //alert(data[0][selection[0].row]);
    //alert(data[0][chart.getSelection().row]);
  }
  
  chart.draw(data, options);
}

function drawBarChart(values) {
  console.log(values.efficiency);
  console.log(values.sustainability);
  console.log(values.capacity);
  var data = google.visualization.arrayToDataTable([
     ['Element', '', { role: 'style' }, { role: 'annotation' }],
     ['Efficiency', values.efficiency, 'b4ca39', values.efficiency],
     ['Sustainability', values.sustainability, '#5f8202', values.sustainability],
     ['Used Capacity', values.capacity, '#e31b23', values.capacity],
  ]);
  var options = {
    //title: 'Population of Largest U.S. Cities',
    //chartArea: {width: '50%'},
    chartArea: {width: '48%', height: '85%'},
    hAxis: {
      //title: 'Total Population',
      minValue: 0,
      maxValue: 10,
      textposition : "none",
      textColor : "#ffffff",
      fontSize : "8",
      //fontSize : "8",
    },
    vAxis: {
      baselineColor : "#fff",
      gridlineColor : "#fff",
      //textColor : "#ffffff",
      textposition : "none",
      fontSize : "8",
      //fontSize : "8",
      //title: 'City'
    },
      fontSize : "8",
    legend : {
      position : "none"
    },
    is3d : true
  };
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function reset() {
  drawRegionsMap();
  $('#fb-comments').attr('data-href', 'https://spaceapp2015-niklaskolbe.c9.io/');
  FB.XFBML.parse();
  $("#index_title").html('');
  $('#chart_div').html('');
  $('#product_title').html('');
  $('#product_images').html('');
}
