const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const db = require("../../db/index.js")

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
                    res.json(JSON.stringify({ error: "user dont exists" }))
                    res.end()
                } else if (bcrypt.compareSync(password, resp.rows[0]["password"])) {

                    jwt.sign(
                        payload,
                        KEY,
                        {
                            expiresIn: 31556926, // 1 year in seconds
                        },
                        (err, token) => {
                            /* Send succes with token */
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        },
                    );




                    res.json(JSON.stringify(resp.rows[0]))
                    res.end()
                } else {
                    res.json(JSON.stringify({ error: "incorrect password" }))
                    res.end()
                }
            })
        }
    }
}