var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
   item: String
});

var Item = mongoose.model('Item', itemSchema);

var items = [];
 
//exports.create = function(req, res){
//   if (!req.param('item')) {
//      res.send('Item not valid');
//      res.statusCode = 400;
//   } else {
//      items.push(req.param('item'));
//      res.send("adding " + req.param('item'));
//   }
//};
exports.create = function(req, res) {
   if (!req.param('item')) {
      res.send('Item not valid');
      res.statusCode = 400;
   } else {
      var item = new Item({ item: req.param('item')});
      console.log(item);
      item.save(function (err, item) {
         if (err) return console.error(err);
         res.send('adding ' + item);
      });
   }
};


//exports.retrieveAll = function(req, res){
//   items.forEach(function (item, i) {
//      res.write(i + '. ' + item + '\n');
//   });
//   res.end();
//};
exports.retrieveAll = function(req, res){
   Item.find(function (err, items) {
      if (err) return console.error(err);
      res.send(items);
   })
};

/*exports.retrieveOne = function(req, res) {
   if (isNaN(req.params.id)) {
      res.send('Item id not valid');
      res.statusCode = 400;
   }
   else if (items[req.params.id]) {
      res.send("getting "+req.params.id);
   }
   else {
      res.send("item not found");
   }
}*/
exports.retrieveOne = function(req, res) {
   Item.find({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
      if (err) return console.error(err);
      res.send(item);
   });
}

/*
exports.update = function(req, res) {
   if (isNaN(req.params.id)) {
      res.send('Item id not valid');
      res.statusCode = 400;
   }
   else if (items[req.params.id] && req.param('item')) {
      items[req.params.id] = req.param('item');
      res.send("putting "+req.params.id);
   }
   else {
      res.send("item not found");
   }
}
*/
exports.update = function(req, res) {
   Item.findByIdAndUpdate(mongoose.Types.ObjectId(req.param('id')), {'item':req.param('item')}, function (err, result) {
      if (err) return console.error(err);
      res.send(result);
   })
}

/*
exports.delete = function(req, res) {
   if (isNaN(req.params.id)) {
      res.send('Item id not valid');
      res.statusCode = 400;
   }
   else if (items[req.params.id]) {
      items.splice(req.params.id, 1);
      res.end('Item deleted successfully');
   }
   else {
      res.send("item not found");
   }
}
*/
exports.delete = function(req, res) {
   Item.remove({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, result) {
      if (err) return console.error(err);
      res.send({});
   })
}
