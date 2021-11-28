const TelegramBot=require("node-telegram-bot-api");
const token='2064289896:AAGLXOLULc434nBL_3ffw7o3gorGkKwewd8';
const bot =new TelegramBot(token, {polling:true})
const chat={}
const {gameOption,againOption}=require("./options.js")
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
            return bot.sendMessage(idChat, '<b>TEST</b>', {parse_mode: 'HTML'});
        }
       return bot.sendMessage(idChat,"Я тебе не розумію")
        
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