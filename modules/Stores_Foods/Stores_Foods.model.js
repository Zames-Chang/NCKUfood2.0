//modules/Stores_Foods/Stores_Foods.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var Stores_FoodsSchema = new Schema({
    id: String,
    food_name: String,
    food_number: String,
    deadline: String,
    location: String,
    image_url: String
    },{collection : 'Stores_Foods'});


var Stores_Foods = mongoose.model("Stores_Foods", Stores_FoodsSchema);

exports.addStores_Foods = (body)=>{
    var Stores_FoodsEntity = new Stores_Foods(body);
    Stores_FoodsEntity.save(function(error,doc) {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}

exports.list_Stores_Foods = ()=>{
    return Stores_Foods.find({}, function(err, Stores_Foods) {
        if (err) throw err;
      
        // object of all the users
        console.log(Stores_Foods);
      });
}
