module.exports={
    getWeather(){
 let axios = require("axios").default;

let options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely',
  params: {lat: '48.29149', lon: '25.94034'},
  headers: {
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
    'x-rapidapi-key': '28b58181b7msh0400383284fd1bap1eab6djsn3df9510c09f3'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
    }
}