const Event = require('../mongo-models/events.model');
const User = require('../mongo-models/users.mongo');
const { eventFormatting } = require('./common');


const eventResolver = {
    events: async () => {
        try {
            const res = await Event.find()
            const retrivedEvents = await res.map(event => {
                return eventFormatting(event)
            });
            return retrivedEvents;
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Permission denied!')
        }

        const event = new Event({
            title: args.eventValues.title,
            description: args.eventValues.description,
            price: +args.eventValues.price,
            date: new Date(args.eventValues.date),
            createdBy: req.userId
        });

        let createdEvent;

        try {
            const res = await event.save()
            createdEvent = eventFormatting(res);
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User not Found!!')
            }
            user.eventList.push(createdEvent);
            await user.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    },

    cancelEvent: async (args) => {
        try {
            const event = await Event.findById(args.eventId);
            
            if (!event) throw new Error('No event available');

            await Event.deleteOne({_id: { $eq: args.eventId}});
            return event._doc;
        }catch(err) {
            throw err;
        }
    }
}

module.exports = eventResolver;