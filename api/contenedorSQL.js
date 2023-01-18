import knexLib from 'knex'

class ContenedorSQL {
    constructor(config, table) {
      this.knex = knexLib(config)
      this.table = table
    }
  
    async save(item) {
        try {
            return this.knex(this.table).insert(item)
        } catch (error) {
            console.log("error", error);
          }
        }

    async getById(id) {
        try {
            return this.knex(this.table).where('id', id).select('*')
        } catch (error) {
            console.log("error", error);
          }
        }

    async getAll() {
        try {
            return this.knex(this.table).select('*')
        } catch (error) {
            console.log("error", error);
          }
        }

    async deleteById(id) {
        try {
            return this.knex(this.table).where('id', id).delete()
        } catch (error) {
            console.log("error", error);
          }
        }

    async deleteAll() {
        try {
            return this.knex(this.table).delete()
        } catch (error) {
            console.log("error", error);
          }
        }


    close() {
        this.knex.destroy()
    }

}

export default ContenedorSQL