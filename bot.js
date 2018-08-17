var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

});

var emLoop = false;
var tempo = 90000;

var interval;

function falaAleatorio (){
	        	
	var fs = require("fs");
	var text = fs.readFileSync("./lista.txt").toString('utf-8');
	var msgs = text.split("\n");
	//randSec = (Math.round(Math.random() * 5)) * 1000;
	var randMsg = Math.round(Math.random() * msgs.length-1);

	bot.sendMessage({
		to: channelID,
		message: msgs[randMsg] // message to send
	});
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command


    if (message.toLowerCase() === "starta ai bot") { // command to trigger
     	//var randSec = (Math.round(Math.random() * 5)) * 1000;
     	if (!emLoop) {
	     	emLoop = true;
	
		bot.sendMessage({
	        	to: channelID,
	        	message: "ok chefe"
	      	});

	     	interval = setInterval(function (){
	        	
			var fs = require("fs");
			var text = fs.readFileSync("./lista.txt").toString('utf-8');
			var msgs = text.split("\n");
			var randMsg = Math.round(Math.random() * msgs.length-1);

			bot.sendMessage({
				to: channelID,
				message: msgs[randMsg] // message to send
			});
		}, tempo); // time between each interval in milliseconds
	}
}

    // New command starts here
    if (message.toLowerCase() === "ajuda bot") {
      bot.sendMessage({
        to: channelID,
        message: "**comandos:**\n`"+
        "eai bot 									  - pra dar um oi\n"+
        "o chris é gay né 							 - pra ver se o chris é gay (valor aleatorio é gerado)\n"+
        "add na lista: <o que vc quer adicionar> 	  - preciso falar q é sem os sinais d < >?\n"+
        "muda tempo bot <milisegundos> 				- 60000 da 1 minuto\n"+
	"bot chama o <usario> de <apelido carinhoso>   - Agrada o usuário mencionado com a palavra escolhida"+
	"hein bot                             - faz uma pergunta de sim ou não ao bot`"

      });
    }

    if (message.toLowerCase().substring(0, 7) == 'eai bot') {
        
        bot.sendMessage({
                    to: channelID,
                    message: 'eai <@!' + userID + '>'
                });
    	
    }

    if (message.toLowerCase().substring(0, 16) == 'o chris é gay né') {        
        bot.sendMessage({
                    to: channelID,
                    message: 'mto'
                });
    }

    if (message.toLowerCase().substring(0, 16) == 'fala a lista ai') {        
        
        var fs = require("fs");
		var text = fs.readFileSync("./lista.txt").toString('utf-8');
		var test = text.split("\n");

        bot.sendMessage({
                    to: channelID,
                    message: test.join('\n')
                });
        
    }

    if (message.toLowerCase().substring(0, 17) == 'qtos tem na lista') {        
        
        var fs = require("fs");
		var text = fs.readFileSync("./lista.txt").toString('utf-8');
		var test = text.split("\n");

        bot.sendMessage({
                    to: channelID,
                    message: 'tem '+(test.length-1)
                });
        
    }

    if (message.toLowerCase().substring(0, 12) == 'add na lista') {  

    	var coisaNova = message.split(': ')[1];

    	bot.sendMessage({
            to: channelID,
            message: 'bl'
        });

    	var fs = require("fs");
		var text = fs.readFileSync("./lista.txt").toString('utf-8');
		var test = text.split("\n");

	    var file = fs.createWriteStream('./lista.txt');

		file.on('error', function(err) { 
				bot.sendMessage({
                    to: channelID,
                    message: 'deu ruim'
                });
		});

		test.push(coisaNova);
	 
		file.write(test.join('\n')); 
		
		file.end();
	}

	if (message.toLowerCase().substring(0, 15) == 'muda tempo bot ') {  

    	tempoTemp = message.split(' ')[3];

    	if (tempoTemp < 10000) {
    			bot.sendMessage({
        		to: channelID,
            	message: 'ta em milisegundo, vc quer q eu fique na velocidade da luz??'
        	});
    	} else {
    			
		tempo = tempoTemp;

    		bot.sendMessage({
        		to: channelID,
            	message: 'ta, agora vai d '+(tempo/1000)+ ' em '+(tempo/1000)+ ' segundos'
        	});	
    	}

    	
	}

	if (message.toLowerCase().substring(0, 5) == 'quero') {  

    	tempoTemp = message.split(' ')[3];
    	
		bot.sendMessage({
    		to: channelID,
        	message: 'seu cu'
    	});
    	
	}

	if (message.toLowerCase().substring(0, 8) == 'pls neko') {      	
    	
		bot.sendMessage({
    		to: channelID,
        	message: 'esse é doente'
    	});
    	
	}

	if (message.toLowerCase().substring(0, 9) == 'pls black') {      	
    	
		bot.sendMessage({
    		to: channelID,
        	message: 'ala o racismo invertido'
    	});
    	
	}

	if (message === 'bn bot') {      	
    	
		bot.sendMessage({
			to: channelID,
			message: 'bn'
    		});
    	
	}

	if (message.toLowerCase().substring(0, 8) == 'bot fala') {  

    	bot.sendMessage({
            to: channelID,
            message: message.split(': ')[1]
        });

	}

	if (message.toLowerCase().substring(0, 10) == 'hein bot o') {  

		var r = Math.round(Math.random() * 1);
		if (r == 0) {
	    	bot.sendMessage({
	            to: channelID,
	            message: 's'
	        });
		} else {
	        bot.sendMessage({
	            to: channelID,
	            message: 'n'
	        });
		}
	}
	
	if (message === 'para de falar bot') {      	
    	
		clearInterval(interval);
		emLoop = false;
		bot.sendMessage({
			to: channelID,
			message: 'ta'
    		});
    	
	}

	if (message.toLowerCase().substring(0, 12) == 'bot chama o ') {      	
    	
		message = message.replace(/\s+/g,' ');

		var ofensa = message.split(' ')[5];	
		var user = message.split(' ')[3];

		bot.sendMessage({
				to: channelID,
				message: 'nuss ' + user + ' vc é mto ' + ofensa + ' cara'
			});

			logger.info(user);

	}
	
	if (message.toLowerCase().substring(0, 11) == 'bot grita: ') {      	
    	
		var texto = message.split(': ')[1];
		
		bot.sendMessage({
			to: channelID,
			message: texto, tts: true
    		});
    	
	}
	
});

