const mySql = {
    client:'mysql',
    connection: {
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'ecommerce',
    }
}


const sqlite3 = {
    client: 'sqlite3',
    connection: './DB/db.sqlite',
    useNullAsDefault: true
}


const options = {
    mySql,
    sqlite3
}

export default options
