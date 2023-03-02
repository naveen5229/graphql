const Event = require('../mongo-models/events.model');
const User = require('../mongo-models/users.mongo');

const eventFormatting = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        createdBy: getCreator.bind(this, event._doc.createdBy)
    }
}

const getEventLists = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return eventFormatting(event);
        })
    } catch (err) {
        throw err;
    }
}

const getSingleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return eventFormatting(event);
    } catch (err) {
        throw err;
    }
}

const getCreator = async createrId => {
    try {
        const user = await User.findById(createrId)
        return { ...user._doc, _id: user.id, eventList: getEventLists.bind(this, user._doc.eventList) }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    eventFormatting,
    getEventLists,
    getSingleEvent,
    getCreator
}