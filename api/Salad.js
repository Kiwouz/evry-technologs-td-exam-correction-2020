let mongoose = require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SaladSchema = new Schema({
    id : String,
    nom : { type : String, required : true},
    description : String,
    ingredients : [String],
    photo : String
});

mongoose.model('Salad', SaladSchema);
