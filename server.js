const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password: 'root',
		database: 'smart_brain'
	}
});
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {res.send(database.users);})
app.post('/signin', (req,res) => {signIn.signInHandler(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('/profile/:id', (req, res) =>{profile.profileHandler(req, res,db)})
app.put('/image', (req, res) => {image.imageHandler(req, res, db)})
app.post('/imageUrl', (req, res) => {image.apiHandle(req, res)})
app.listen(3000, () => {
	console.log('app is running on port 3000');
})

