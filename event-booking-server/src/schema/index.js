const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Booking {
    _id: ID!
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID
    title: String!
    description: String!
    price: Float!
    date: String!
    createdBy : User!
}

type User {
    _id: ID!
    email: String!
    password: String
    eventList: [Event!]
}

type auth{
    userId: String!
    token: String!
    tokenExpiration: Int!
}

input EventValues{
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    email: String!
    password: String!
}

type rootQuery {
    events : [Event!]!
    users : [User!]!
    bookings: [Booking!]!
    login(email:String!, password:String!): auth!
}

type rootMutation {
    createEvent(eventValues: EventValues): Event!
    cancelEvent(eventId: ID!): Event!
    createUser(userDetail: UserInput): User!
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query : rootQuery
    mutation : rootMutation
}
`);

module.exports = schema;