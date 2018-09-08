window.onload = function() {
    var socket = io("/admin");
  
  
    var season = [
      { label: "spring", y: 0 },
      { label: "summer", y: 0 },
      { label: "autumn", y: 0 },
      { label: "winter", y: 0 }
      ];
    
    var chartContainer = document.querySelector('#chartContainer');
  
  
    if (chartContainer) {
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme2",
        title: {
          text: "Online polling"
        },
        data: [{
          type: "column",
          dataPoints: season
        }]
      });
      chart.render();
    }
  
    function drawChart(title, data) {
      for (var item in data) {
        for (var i = 0; i < season.length; i++) {
          if (item == season[i].label) {
            season[i]["y"] = data[item];
            break;
          }
        }
      }
  
      chart.render()
    };
  
    
    socket.on("pollingData", function(data) {
      drawChart('Online Poll', data);
    });

    socket.emit('getData');
    
  
  }