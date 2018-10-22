//modules/Collaborators/Collaborators.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var CollaboratorsSchema = new Schema({
    shop_name: String,
    food_name: String,
    food_number: String,
    deadline: String,
    location: String,
    time_hr: String,
    time_min: String,
    normal_price: String,
    special_price: String,
    image_url: String
    },{collection : 'Collaborators'});


var Collaboratorss = mongoose.model("Collaborators",CollaboratorssSchema);

exports.addCollaborators = (body)=>{
    var CollaboratorsEntity = new Collaborators(body);
    CollaboratorsEntity.save(function(error,doc) {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}

exports.list_Collaborators = ()=>{
    return Collaborators.find({}, function(err, Collaborators) {
        if (err) throw err;
      
        // object of all the users
        console.log(Collaborators);
      });
}
