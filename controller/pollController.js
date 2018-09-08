module.exports = function(io, pollModel) {

    var afterInit = function(err, success) {
      if (!err && success) {
        console.log("Initial values set");
  
      }
    }
  
    pollModel.initDataBase(afterInit);
    var admin = io.of('/admin');
    var user = io.of('/user');
    
    var sendPollToClient = function(err, value) {
      console.log(value);
      if (!err) {
        admin.emit("pollingData", value);
      } else {
        console.log(err);
      }
    }
  
  
    admin.on('connection', function(socket) {
      socket.on('getData',function() {
          console.log('getData called');
          pollModel.getKey(sendPollToClient);
      });
    });
  
    user.on('connection', function(socket) {
      
      var getUpdatedPoll = function(err, success) {
        if (!err && success) {
          pollModel.getKey(sendPollToClient);
          socket.emit('submitStatus', err, success);
        } else {
          console.log(err);
        }
      }
  
      var updatePoll = function(err, value, data) {
        if (!err) {
          value[data]++;
          pollModel.setData(value, getUpdatedPoll);
        } else {
          console.log(err);
        }
      }
  
      socket.on("submitData", function(data) {
        pollModel.getKey(function(err, value) {
          updatePoll(err, value, data);
        });
      });

      
      
    });
  }