const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookingsSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: schema.Types.ObjectId,
        ref: 'Event'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Booking', bookingsSchema);