const 
  fb = require('../fb'),
  Subtract = require('array-subtract')  //用於兩個矩陣相減
  tem = require("fb-messenger")
  var k = new tem(fb.page_token)
module.exports = {
  sendfood :(ajaxdata)=>{
    return {
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "generic",
            "elements":[{
              "title": ajaxdata.food_name,
              "subtitle":"食物數量:"+ ajaxdata.food_number + "\n地址:"+ ajaxdata.location + "\n請在" + ajaxdata.deadline +"來拿",
              "image_url": ajaxdata.image_url,
              "buttons":[
                {
                  "type":"postback",
                  "title":"我想要 " + ajaxdata.food_name ,
                  "payload": "yes&"+ajaxdata.id+"&"+ajaxdata.food_name
                },
                {
                  "type":"postback",
                  "title":"我不要 " + ajaxdata.food_name, 
                  "payload": "no&"+ajaxdata.id+"&"+ajaxdata.food_name
                }
              ],
            }]
          }
        }
      } 
  },
  tossfooder :(ajaxdata)=>{
    return {
        "attachment":{
          "type": "template",
          "payload":{
            "template_type": "button",
            "text":"如果" + ajaxdata.food_name + "順利發完，或者不想發了，請記得按【發完了】，謝謝！",
            "buttons":[
                {
                  "type":"postback",
                  "title":ajaxdata.food_name +" 發完了" ,
                  "payload": "empty&"+ajaxdata.food_name,
                  
                }
              ],
          }
        }
     }
   },
  dealmes:(body,res,EVENTS)=>{
    var subtract = new Subtract((a, b) => { return a === b })
		body.entry.forEach(function(entry){
                console.log("entry:")
		console.log(entry)
		let webhook_event
		if(entry.standby){
		    webhook_event = entry.standby[0]
//		    console.log("fuck")
		    console.log(webhook_event)
		}
		else if(entry.messaging){    
		    webhook_event = entry.messaging[0]
		}
		let sender_psid = webhook_event.sender.id
                //let sender_psid = entry.id
		//console.log(sender_psid) 
    		console.log("get post id:"+sender_psid);
    		if(webhook_event.postback){
		//	var get = webhook_event.postback.payload.split("&") 
			var get = webhook_event.postback.title.split(" ")
		//	if(get[0]=== "empty"){
			if(get[1] === "發完了"){
				var deleted_index 
				for(var i = 0 ; i <  EVENTS.length; i++){
					if( EVENTS[i].id === sender_psid &&  EVENTS[i].food_name === get[0]){
						deleted_index=i 
						var pro_sub_no = subtract.sub( EVENTS[i].promotion, EVENTS[i].who_say_no) 
						var who_no_response = subtract.sub(pro_sub_no, EVENTS[i].who_say_yes) 
						for(var j=0; j<pro_sub_no.length; j++){
							fb.handleMessage(pro_sub_no[j],"",{"text":  EVENTS[i].food_name + " 已經發完了"}) //發訊息給除了no的人 說食物沒了
						} 
					//降低沒回應者的機率   
					}
				}
				 EVENTS.splice(deleted_index,1) 
			}
      		else if(get[0]==="我想要"){
				for(var i = 0 ; i <  EVENTS.length ; i++){
					if( EVENTS[i].food_name === get[1] ){  //&&  EVENTS[i].food_name === get[2]){
						 EVENTS[i].who_say_yes.push(sender_psid)  
						 fb.handleMessage(sender_psid,"",{"text":"快去拿喔~沒了就只能ㄅ欠@@"}) 
					}
				}
			}
      		else if(get[0]==="我不要"){
				for(var i = 0 ; i <  EVENTS.length ; i++){
					//if( EVENTS[i].id === get[1] &&  EVENTS[i].food_name === get[2]){
					if( EVENTS[i].food_name === get[1] ){   //&&  EVENTS[i].food_name === get[2]){
						 EVENTS[i].who_say_no.push(sender_psid) 
						 fb.handleMessage(sender_psid,"",{"text":"ㄅㄅ囉~好拉下一次還是會跟你說"}) 
				  }
			  }
			}
      else if(get[0]==="subscribe"){
					fb.handleMessage(sender_psid,"",{"text":"功能即將推出，敬請期待！"}) 
      }
		}
		else if(webhook_event.message){
		  fb.handleMessage(sender_psid, webhook_event.message,"")
  		  //k.sendTextMessage(sender_psid,"維修中sorry")
   		  //console.log("run");
		}
    else if(webhook_event.postback){
	    fb.handlePostback(sender_psid, webhook_event.postback) 
		}
	}) 
	res.status(200).send('EVENT_RECEIVED') 
  }
}
