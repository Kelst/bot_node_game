const TelegramBot=require("node-telegram-bot-api");
const token='2064289896:AAGLXOLULc434nBL_3ffw7o3gorGkKwewd8';
const bot =new TelegramBot(token, {polling:true})
const chat={}
const weatherP={}

const {gameOption,againOption}=require("./options.js")
const {getWeather} = require('./weather');
getWeather.then(weather =>{
    weatherP.city=weather.data.location.city;
    weatherP.region=weather.data.location.region;
    weatherP.speed=weather.data.current_observation.wind.speed;
    weatherP.visibility=weather.data.current_observation.atmosphere.visibility;
    weatherP.sunrise=weather.data.current_observation.astronomy.sunrise;
    weatherP.sunset=weather.data.current_observation.astronomy.sunset;
    weatherP.condition=weather.data.current_observation.condition.text;
    weatherP.temperature=weather.data.current_observation.condition.temperature;
})

async function  startGame(idChat){
    await bot.sendMessage(idChat,"Я загадав число від 0 до 10 ");
    const randomNumber=Math.floor(Math.random()*10);
    chat[idChat]=randomNumber;
   await bot.sendMessage(idChat,"Готово , відгадуй :",gameOption);
}

const start=()=>{
    bot.setMyCommands([{
        command:"/start",
        description:"Start Bot"
    },
    {
        command:"/info",
        description:"Get Informatio"
    },
    {
        command:"/game",
        description:"Start game"
    },
    {
        command:"/weather",
        description:"get weather"
    },

])
    bot.on("message", async msg=>{
        const text=msg.text;
        const idChat=msg.chat.id;
        if(text==="/start")
        return await  bot.sendSticker(idChat,"https://tlgrm.ru/_/stickers/c04/fe1/c04fe137-edbc-41e7-a199-b530c42bfe9e/5.webp")
        if(text==="/info"){
           return bot.sendMessage(idChat,`Привіт тебе звати ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text==="/game"){
          return   startGame(idChat)

        }
        if(text==="/weather"){
            const result=`Місто : ${weatherP.city} \n
            Регіон : ${weatherP.region} \n
            Швидкість вітру : ${weatherP.speed} \n
            схід сонця: ${weatherP.sunrise}  \n
            захід сонця: ${weatherP.sunset} \n
            погода :${weatherP.condition} \n
            температура :${weatherP.temperature} \n
            `
           
        return bot.sendMessage(idChat,result)
        }
     
        
    })
    bot.on("callback_query", async msg=>{
      
        const data=msg.data;
        const idChat=msg.message.chat.id;
    
        if(data=="/again"){  return startGame(idChat)}
        if(data==chat[idChat]){
            return bot.sendMessage(idChat,"Ура ти вгадав число!!!!"+data,againOption);
        }else
        return bot.sendMessage(idChat,"Ти не вгадав число)",againOption);
        
    })
    bot.on("polling_error", console.log);
}
start()