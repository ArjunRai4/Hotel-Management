const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    checkIn: Date,
    checkOut: Date,
    rooms: Number,
    guests: Number,
    totalAmount:String,
},{timestamps:true});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports=Booking;

