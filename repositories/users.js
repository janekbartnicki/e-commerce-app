const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository{
    async create(attrs) {
        const records = await this.getAll();
        attrs.id = this.getRandomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buffer = await scrypt(attrs.password, salt, 64);

        const record = ({
            ...attrs,
            password: `${buffer.toString('hex')}.${salt}`
        });

        records.push(record);

        await this.writeAll(records);
        return record;
    }

    async comparePassword(saved, suppiled) {
        const [hashed, salt] = saved.split('.');
        const hashedSuppiled = await scrypt(suppiled, salt, 64);

        return hashed === hashedSuppiled.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');