//modules/Stores_Foods/Stores_Foods.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  

var Stores_FoodsScehma = new Schema({
    id: String,
    store_name: String,
    food_inf: {
        img:[String],
        price:[Number],
        name:[String]
    },
    deadline: String,
    location: String
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
