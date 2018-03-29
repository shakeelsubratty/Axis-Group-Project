module.exports = {
    DEBUG: false,
    mongoUrl: `mongodb://${process.env.DB_PORT_27017_TCP_ADDR}:${process.env.DB_PORT_27017_TCP_PORT}/app`, //URL to connect to mongodb
    participantRoot: '/participant',
    workshopRoot: '/workshop',
    ideaRoot: '/idea',
    authRoot: '/auth'
}
