const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const { nanoid } = require("nanoid")
const db = require("../../db/index.js")
const jwt = require("jsonwebtoken")
const JWT_KEY = process.env.JWT_KEY


export default (req, res) => {
	if (req.method == "POST") {
		const { username, password } = JSON.parse(req.body)
		if (username === undefined || password === undefined) {
			res.json(JSON.stringify({ error: "invalid username or password" }))
			res.end()
		} else {

			db.query('SELECT * FROM users WHERE username = $1', [username], (err, resp) => {
				if (err) {
					console.log(err.stack)
					res.json(JSON.stringify({ error: "err >:(" }))
					res.end()
				} else if (resp.rows == 0) {
					var id = nanoid()
					var hashedPassword = bcrypt.hashSync(password, salt);
					db.query('INSERT INTO users(id, username, password) VALUES($1, $2, $3)', [id, username, hashedPassword], (err, respo) => {
						if (err) {
							console.log(err.stack)
							res.json(JSON.stringify({ error: "err >:(" }))
							res.end()
						} else {

							jwt.sign({ id: id, username: username, password: hashedPassword },
								JWT_KEY, 
								{
									expiresIn: 31556926
								},
								(err, token) => {
									res.status(200).json({
										success: true,
										token: 'Bearer' + token,
										userData: { id: id, username: username, password: hashedPassword }
									})
							})
						}
					})
				} else {
					res.json(JSON.stringify({ error: "username already exists" }))
					res.end()
				}
			})


		}
	} else {
		res.json(JSON.stringify({ error: "get method" }))
		res.end()
	}
}
