
 var axios = require("axios").default;
 async   function  getWeather  (){
        var options = {
          method: 'GET',
          url: 'https://yahoo-weather5.p.rapidapi.com/weather',
          params: {location: 'chernivtsi', format: 'json', u: 'c'},
          headers: {
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
            'x-rapidapi-key': '28b58181b7msh0400383284fd1bap1eab6djsn3df9510c09f3'
          }
        };
       
      return  axios.request(options)
        
}

module.exports= {getWeather: getWeather()};