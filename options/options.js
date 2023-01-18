const maria = {
    client:'mysql',
    connection: {
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'ecommerce'
    }
}

const mySql= {
    client: 'sqlite3',
    connection: './DB/db.sqlite',
    useNullAsDefault: true
}

const options = {
    maria,
    mySql
}
 export default options