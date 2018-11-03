//modules/Collaborators/Collaborators.model.js

const mongoose = require('mongoose'),   

Schema = mongoose.Schema;  
var CollaboratorsSchema = new Schema({
    id: String,
    shop_name: String,
    location: String
    },{collection : 'Collaborators'});


var Collaborators = mongoose.model("Collaborators",CollaboratorsSchema);

CollaboratorsSchema.statics.find_by_id = (id, callback)=>{
    return this.findOne({id: id}, callback);
}

exports.find_by_id = (id, callback)=>{
    return Collaborators.findOne({id: id}, callback);
}

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
      
        // object t of all the users
        console.log(Collaborators);
      });
}
