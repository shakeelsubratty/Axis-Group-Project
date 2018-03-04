module.exports = {
    DEBUG: true, //currently used to spew a bunch of diagnostics into the console
    mongoUrl: `mongodb://${process.env.DB_PORT_27017_TCP_ADDR}:${process.env.DB_PORT_27017_TCP_PORT}/app`,
    participantRoot: "/participant" //routes for everything participant-related
}
