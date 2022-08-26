const fs = require('fs');
const fsPromises = require('fs/promises');
const crypto = require('crypto');
const { isModuleNamespaceObject } = require('util/types');

class UsersRepository {
    constructor(filename) {
        if(!filename) {
            throw new Error('Creating a repository requires a filename!');
        }

        this.filename = filename;

        try {
            fs.accessSync(this.filename);
        } catch {
            fs.appendFileSync(this.filename, '[]');
        }
    }

    async getAll() {
        return JSON.parse(
            await fsPromises.readFile(this.filename, {encoding: 'utf8'})
        );
    }

    async create(attrs) {
        const records = await this.getAll();
        attrs.id = this.getRandomId();
        records.push(attrs);

        await this.writeAll(records);
        return attrs;
    }

    async writeAll(records) {
        await fsPromises.writeFile(this.filename, JSON.stringify(records, null, 2));      
    }

    getRandomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();

        await this.writeAll(records.filter(record => record.id !== id));
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if(!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for(let record of records) {
            let found = true;

            for(let key in filters) {
                if(record[key] !== filters[key]) {
                    found = false;
                }
            }

            if(found) {
                return record;
            }
        }
    }
}

module.exports = new UsersRepository('users.json');