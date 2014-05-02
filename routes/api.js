var express = require('express');
var router = express.Router();
var VirtualHub = require('../lib/virtualhub');

var vh = new VirtualHub();
vh.init();

/* Instant values */ 

router.get('/sensors',function(req,res){
	var test = [];
 	vh.things.forEach(function(thing){
    if(thing.get_currentValue)
      test.push({id : thing.get_hardwareId(), val : thing.get_currentValue() });
  	});
  res.json(test);
});

router.get('/sensor/:id',function(req,res){
	
	var result = vh.things.filter(function(thing){
		return (thing.get_hardwareId() == req.params.id);
	});
	if (result.length > 0){
		var thing = { id : result[0].get_hardwareId(), val : result[0].get_currentValue() }
		res.json(thing);
	}
	else
	{
		res.json([]);
	}
});







module.exports = router;
