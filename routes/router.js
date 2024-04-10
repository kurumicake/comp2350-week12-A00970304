const router = require('express').Router();
const database = include('databaseConnection');
const User = include('models/user');
const Pet = include('models/pet');
const Joi = require("joi");

router.get('/', async (req, res) => {
	console.log("page hit");
	try {
		const result = await User.find({})
			.select('first_name last_name email id').exec();
		console.log(result);
		res.render('index', { allUsers: result });
	}
	catch (ex) {
		res.render('error', { message: 'Error' });
		console.log("Error");
		console.log(ex);
	}
});

router.get("/populateData", async (req, res) => {
	console.log("populate Data");
	try {
		let pet1 = new Pet({
			name: "Fido"
		});
		let pet2 = new Pet({
			name: "Rex"
		});
		await pet1.save();
		//pet1.id contains the newly created pet's id
		console.log(pet1.id);
		await pet2.save();
		//pet2.id contains the newly created pet's id
		console.log(pet2.id);
		let user = new User({
			first_name: "Me",
			last_name: "Awesome",
			email: "a@b.ca",
			password_hash: "thisisnotreallyahash",
			password_salt: "notagreatsalt",
			pets: [pet1.id, pet2.id]
		}
		);
		await user.save();
		//user.id contains the newly created user's id
		console.log(user.id);
		res.redirect("/");
	}
	catch (ex) {
		res.render('error', { message: 'Error' });
		console.log("Error");
		console.log(ex);
	}
});

router.get('/showPets', async (req, res) => {
	console.log("showPets page hit");
	try {
		// Validate the user ID
		console.log("Request query parameters:", req.query);
		const schema = Joi.object({
			id: Joi.string().max(25).required()
		});
		console.log("Requested ID:", req.query.id);
		const validationResult = schema.validate({ id: req.query.id });
		if (validationResult.error) {
			console.log(validationResult.error);
			return res.render('error', { message: 'Invalid user ID' });
		}

		// Attempt to find the user by ID and populate their pets
		const userResult = await User.findOne({ _id: req.query.id })
			.select('first_name last_name email pets')
			.populate('pets', 'name')
			.exec();

		if (!userResult) {
			return res.render('error', { message: 'User not found' });
		}

		console.log(userResult);
		res.render('pet', { userAndPets: userResult });
	} catch (ex) {
		console.log("Error in showPets:", ex);
		res.render('error', { message: 'Error fetching user and pets' });
	}
});

module.exports = router;
