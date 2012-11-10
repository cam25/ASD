function(doc) {
  if (doc._id.substr(0, 16) === "Event:BabyShower") {
    emit(doc._id,{
    	"group": doc.group,
    	"firstName": doc.firstName,
    	"lastName": doc.lastName,
    	"address": doc.address,
    	"city": doc.city,
    	"state": doc.state,
    	"phoneNumber": doc.phoneNumber,
    	"email": doc.email,
    	"timeEVent": doc.timeEVent,
    	"date": doc.date,
    	"textBox": doc.textBox,
    	"iq": doc.iq,
    	"checkBox": doc.checkBox
    	
    
    });
    		
  }
};