function(doc) {
  if (doc.value.group === "birthday") {
    emit(doc.value,{
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

//if (doc.value.group === "birthday") {