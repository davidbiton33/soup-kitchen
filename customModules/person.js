const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    fullName: String,
    mail:String,
    phone:Number,
    adressForDelovary:{
        city:String,
        streetName:String,
        houseNum:String,
        enterNum:String,
        zipCode:Number,
        mailBoxNumber:Number
    },
    donatePrice:Number

});

module.exports = mongoose.model('persons', personSchema);
