import { Database as sqlite } from 'sqlite-async';
import crypto from 'crypto';

export default class Database {
	constructor(db_file) {
		this.db_file = db_file;
		this.db = undefined;
	}

	async connect() {
		this.db = await sqlite.open(this.db_file);
	}

	async migrate() {
        let adminpw = crypto.randomBytes(20).toString('hex');
		return this.db.exec(`
			DROP TABLE IF EXISTS users;
			CREATE TABLE users (
				id         INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
				username   VARCHAR(255) NOT NULL UNIQUE,
                fullname   VARCHAR(255) NOT NULL DEFAULT 'N/A',
				password   VARCHAR(255) NOT NULL,
                email      VARCHAR(255) NOT NULL DEFAULT 'N/A',
                joined_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
                bio       VARCHAR(255) NOT NULL DEFAULT 'N/A',
                theme     VARCHAR(255) NOT NULL DEFAULT 'light'
			);

			INSERT OR IGNORE INTO users (username, password, fullname, email, bio)
				VALUES ('admin', '${adminpw}', 'Administrator', 'johnny@jagablog.com', 'I am the administrator of this blog.');

			DROP TABLE IF EXISTS posts;
			CREATE TABLE posts (
				id               INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
                title           VARCHAR(255) NOT NULL,
                author         VARCHAR(255) NOT NULL,
				content          TEXT         NULL,
				created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
			);

            INSERT OR IGNORE INTO posts (title, author, content)
                VALUES ('Hello World', 'admin', 'This is the first post');
		`);
	}

	async registerUser(user, pass) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
				resolve(await stmt.run(user, pass));
			} catch(e) {
                console.log(e)
				reject(e);
			}
		});
	}

	async loginUser(user, pass) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT username FROM users WHERE username = ? and password = ?');
				resolve(await stmt.get(user, pass));
			} catch(e) {
				reject(e);
			}
		});
	}

	async getUser(username) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT * FROM users WHERE username = ?');
				resolve(await stmt.get(username));
			} catch(e) {
				reject(e);
			}
		});
	}

	async listUsers() {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT * FROM users');
				resolve(await stmt.all());
			} catch(e) {
				reject(e);
			}
		});
	}

    async updateTheme(user) {
        return new Promise(async (resolve, reject) => {
            try {
                let stmt = await this.db.prepare('UPDATE users SET theme = ? WHERE id = ?');
                resolve(await stmt.run(user.theme, user.id));
            } catch(e) {
                reject(e);
            }
        });
    }

	async addPost(title, username, content) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare(`
					INSERT INTO posts (title, author, content)
						VALUES (?, ?, ?);
				`);
				resolve(await stmt.run(title, username, content));
			} catch(e) {
				reject(e);
			}
		});
	}

	async listPosts() {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT * FROM posts order by id desc');
				resolve(await stmt.all());
			} catch(e) {
				reject(e);
			}
		});
	}

	async getPost(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT * FROM posts where id = ?');
				resolve(await stmt.get(id));
			} catch(e) {
				reject(e);
			}
		});
	}

}
