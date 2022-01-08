const knex = require("../db/connection");
const tableName = "reservations"

const list = date => {
    if (date) {
        return  knex(tableName)
                .select("*")
                .where({reservation_date: date})
    } 
    return knex(tableName).select("*")
}

const create = (reservation) => {
    return  knex(tableName)
            .insert(reservation)
            .returning("*")
}

module.exports = {
    list,
    create
}