window.onload = function() {


    var socket = io("/user");
  
    var favouriteSeason = '';
  
     var checkOptionSelected = function(name) {
      var radio_check_val = "";
      for (i = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked) {
          return true;
        }
      }
      return false;
    }
  
    var getOptionValue = function(name) {
      var radio_check_val = "";
      for (i = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked) {
          radio_check_val = document.getElementsByName(name)[i].value;
        }
      }
      return radio_check_val;
    }
    
    socket.on('submitStatus', function(err, success) {
      if (!err && success) {
        var button = document.getElementById('submit');
        button.innerText = 'Your Poll is sucessfully submited';
        button.disabled = true;
        var text = document.createTextNode('You have selected : ' + favouriteSeason);
        button.parentNode.insertBefore(text, button.nextSibling);
      }
  
    });
  
    var pollData = function(evt) {
      evt.preventDefault();
      if (checkOptionSelected('season')) {
        favouriteSeason = getOptionValue('season');
        socket.emit("submitData", favouriteSeason);
      }
    }
  
    document.getElementById('submit').addEventListener('click', pollData);
  
  
  }