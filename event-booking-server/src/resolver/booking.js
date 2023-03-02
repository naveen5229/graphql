const Event = require('../mongo-models/events.model');
const Booking = require('../mongo-models/bookings.mongo');
const { getSingleEvent, getCreator } = require('./common');

const bookingResolver = {
    bookings: async () => {
        try {
            const retrivedBookings = await Booking.find();
            const bookings = retrivedBookings.map(booking => {
                return {
                    ...booking._doc,
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                    user: getCreator.bind(this, booking._doc.user),
                    event: getSingleEvent.bind(this, booking._doc.event)
                }
            });
            return bookings
        } catch (err) {
            throw err;
        }
    },

    bookEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Permission denied!')
        }
        
        try {
            const fetchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user: req.userId,
                event: fetchedEvent
            })
            const res = await booking.save();
            return {
                ...res._doc,
                _id: res.id,
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                user: getCreator.bind(this, booking._doc.user),
                event: getSingleEvent.bind(this, booking._doc.event)
            }
        } catch (err) {
            throw err;
        }
    },

    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            if (!booking) {
                throw new Error('No booking found')
            }
            const event = {
                ...booking._doc.event._doc,
                _id: booking._doc.event.id,
                createdBy: getCreator.bind(this, booking._doc.event._doc.createdBy)
            }
            await Booking.deleteOne({ _id: { $eq: args.bookingId } });
            return event;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = bookingResolver;