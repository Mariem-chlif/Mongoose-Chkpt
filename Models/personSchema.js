const mongoose = require('mongoose')

const Schema = mongoose.Schema;
//2 Create person 

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true 
    }, 
    age: Number,
    favoriteFoods: [String] 
})


module.exports = mongoose.model('Person', PersonSchema)