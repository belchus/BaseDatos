import options from './options/options.js'
import knexLib from 'knex'


try {
    const mariaDB = knexLib(options.mySql)
    await mariaDB.schema.dropTableIfExists('misproductos')
    await mariaDB.schema.createTable('misproductos', table => {
        table.increments('id').primary();

        table.string('title', 30).notNullable();

        table.float('price',255).notNullable();

        table.string('thumbnail', 100).notNullable()
    })
    console.log('Tabla creada con exito')
    await mariaDB.destroy()

} catch (error){
    console.log('No se pudo crear la tabla', error)
}

try {
const SQLite = knexLib(options.sqlite3)
await SQLite.schema.dropTableIfExists('mensajes')
await SQLite.schema.createTable('mensajes', table => {
    table.increments('id').primary();
    table.string('user', 20).notNullable();
    table.string('msn', 255).notNullable();
    table.string('date', 15).notNullable()
})
console.log('Tabla SQLite3 creada con éxito')
await SQLite.destroy()
} catch (error){
console.log('No se pudo crear la tabla', error)
}
