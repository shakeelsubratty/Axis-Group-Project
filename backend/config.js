/**
 * Config.js, configuration variables that are used within the backend
 * of the application.
 */
module.exports = {
    DEBUG: true, //currently used to spew a bunch of diagnostics into the console
    mongoUrl: `mongodb://${process.env.DB_PORT_27017_TCP_ADDR}:${process.env.DB_PORT_27017_TCP_PORT}/app`, //URL to connect to mongodb
    participantRoot: "/participant", //routes for everything participant-related
    workshopRoot: "/workshop", //routes for everything workshop-related
    ideaRoot: "/idea",
    authRoot: "/auth" //routes for everything workshop-related
}
