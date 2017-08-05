require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const APP_ID = process.env.APP_ID;

//get search results from nutritionix API from search query
function getItemsFromApi(req,res,next) {
	//search item
	let itemName = req.params.item;
	//API request
	fetch(`https://api.nutritionix.com/v1_1/search/${req.params.item}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=${APP_ID}&appKey=${API_KEY}`)
	.then(fetchRes => fetchRes.json())
	.then(jsonRes => {
		console.log(jsonRes);
		res.locals.results = jsonRes.hits;
		next();
	}).catch(err => {
		console.log(err);
		next();
	});
}

module.exports = {getItemsFromApi : getItemsFromApi};