module.exports = function(app, path, public) {

    app.get('/', function(req, res) {
      res.sendFile(path.join(public, '/views/index.html'));
    });
  
    app.get('/admin', function(req, res) {
      res.sendFile(path.join(public, '/views/admin.html'));
    });
    
  }