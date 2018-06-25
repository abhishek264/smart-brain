const Clarifai = require('clarifai');

//api key
const app = new Clarifai.App({
 apiKey: 'd195c7b48a494475b1e16c5637b45db1'
});

const apiHandle =  (req, res) =>{
		app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
	}
        
const imageHandler = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to update entries'))	
}

module.exports = {
	imageHandler: imageHandler,
	apiHandle: apiHandle
}