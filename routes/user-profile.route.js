exports = module.exports = function() {

  var express = require('express');
  
  var router = express.Router();

  router.rootRoutePath = '/api/user-profile';

  router.get('/test', function(req, res, next) {

  var payload = {"data": {"test":"this is a test"}};

  res.status(200);
  res.send(payload); 

});

    
  router.get('/', function(req, res, next) {

    var payload = {"data": {}};
    
    var searchLat = req.query.searchlat ? +req.query.searchlat : 0;
    var searchLng = req.query.searchlng ? +req.query.searchlng : 0;
    var maxDistance = req.query.maxdistance ? +req.query.maxdistance : 1000000;
    var rowsToReturn = req.query.rowsToReturn ? +req.query.rowsToReturn : 1000;

    userProfileServerService.fetchByLocation(searchLat, searchLng, maxDistance, rowsToReturn, function(result){
        payload.data = result;
        res.status(200);
        res.send(payload); 
      }
    );
  });
  
  
  router.get('/auth', function(req, res, next) {

    var payload = {"data": {}};
    
    userProfileServerService.fetchByAuthProvider_AuthUserId(req.query.authprovider, req.query.authuserid, function(result){
        payload.data = result;
        res.status(200);
        res.send(payload); 
      }
    );
  });
  

router.post('/save', function(req, res, next) {
    var payload = req.body.data;
    
    var returnVal = {"data": {}};
    
    userProfileServerService.save(payload,
        function(result)
        {
            res.status(200);
            returnVal.data = result;
            res.send(returnVal);
        }    
    );
});

router.get('/:id', function(req, res, next) {

    var payload = {"data": {}};

    userProfileServerService.fetchById(req.params.id, function(result){
        payload.data = result;
        res.status(200);
        res.send(payload); 
      }
    );
  });



return router;
}
