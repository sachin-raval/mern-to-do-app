const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    name: { type: String  , required : true},
    email: { type: String , unique: true , required : true },
    password: { type: String  , required : true},
})

const USER = mongoose.models.user || mongoose.model('user' , useSchema);
module.exports = USER ;