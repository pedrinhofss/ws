const low = require('lowdb')
const { nanoid } = require("nanoid")
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json', {
	serialize: (data) => encrypt(JSON.stringify(data)),
	deserialize: (data) => JSON.parse(decrypt(data))
  })
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults([])
	.write()

// Add a post
db.get()
	.push({id: nanoid(), email: req.body.email, password: req.body.password})
	.write()


// Increment count
db.update('count', n => n + 1)
	.write()

export default (req, res) => {
	res.statusCode = 200

	if (req.method == "POST") {

		if(req.body.email === undefined ||  req.body.password === undefined)
			res.json(JSON.stringify({status: "error", error: "Undefined email or password field."}))
		
		db.getState()

		bcrypt.hash(req.body.password, 1, function(err, hash) {
			// Store hash in your password DB.
		});


		db.get('users')
		.push({ email: req.body.email, password: req.body.password})
		.write()


		db.get('posts')
		.push({ id: 1, title: 'lowdb is awesome' })
		.write()


	}

		db.read()
	console.log(db.getState());
	res.json({ name: 'John Doe' })
}
