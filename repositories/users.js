const fs = require('fs');
const fsPromises = require('fs/promises');

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
        records.push(attrs);
        
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');

    repo.create({1: 'janek'});
};

test();