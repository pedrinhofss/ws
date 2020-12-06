const low = require('lowdb')
const { nanoid } = require("nanoid")
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults([])
	.write()



export default (req, res) => {
	res.statusCode = 200

	if (req.method == "POST") {

		if (req.body.username === undefined || req.body.password === undefined)
			res.json(JSON.stringify({ status: "error", error: "Undefined email or password field." }))

		db.getState()

		bcrypt.hash(req.body.password, 1, function (err, hash) {
			res.json(			db.get()
			.push({ id: nanoid(), username: req.body.username, password: hash })
			.write())
			
			

		});




	}

	db.read()
	res.json()
}
