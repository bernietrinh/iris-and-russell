var mongoose = require('mongoose');

var rsvpSchema = new mongoose.Schema({
    email : { type: String, required: true },
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    phone : { type: Number, required: true },
    address : { type: String, required: true },
    postalCode : { type: String, required: true },
    city  : { type: String, required: true },
    country  : { type: String, required: true },
    comments : { type: String, required: false },
    guestName : { type: String, required: false },
    allergies : { type: String, required: false },
    children : { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('rsvp', rsvpSchema);