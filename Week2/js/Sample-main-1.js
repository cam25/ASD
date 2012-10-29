$('#Home').on('pageinit', function () {
    //code needed for home page goes here
    console.log("Page one loaded.");
 
 
 
});
 
$('#addItem2').on('pageinit', function () {
 
    var validate = function () {
        var evForm = $('#eventForm');
        evForm.validate({
            invalidHandler: function (form, validator) {},
            submitHandler: function () {
                var data = evForm.serializeArray();
                storeData(this.key);
                
                console.log(localStorage);
 
            }
        });
    };
   
    var getImage = function (catName, makeOtherList) {
        var imageLi = $("<li>");
        makeOtherList.append(imageLi);
        var newImage = $("<img>");
        var setSource = newImage.attr("src", "images/" + catName + ".png");
        imageLi.append(newImage);
 
    };
    
    
    var storeData = function (key) {
        if (!key) {
 
 
            id = Math.floor((Math.random() + 1) * 10000000);
        } else {
            //Set the id to the existing key we're editting so that it will save the data.
            //The key is the same key that's been passed along from the editSubmit eventhanbdler.
            //to the validate function, then passed here, into the storeData 
            id = key;
 
        }
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input values
        var item = {};
        item.group = ["Event:", $("#select-choice-1").val()];
        item.firstName = ["FirstName:", $("#firstName").val()];
        item.lastName = ["LastName:", $("#lastName").val()];
        item.address = ["address:", $("#address").val()];
        item.city = ["City:", $("#city").val()];
        item.state = ["State:", $("#state").val()];
        item.phoneNumber = ["PhoneNumber:", $("#phoneNumber").val()];
        item.email = ["Email:", $("#email").val()];
        //item.timeEVent = ["TimeOfEvent:", $("timeOfEvent").value];
        item.date = ["mydate:", $("#mydate").val()];
        item.textBox = ["TextBox:", $("#textBox").val()];
        item.iq = ["Range:", $("#range").val()];
        //item.checkBox = ["CheckBox:", gE("checkbox").value];
 
 
        //save data to local storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved");
        $.mobile.changePage("#displayPage");
        
 
    };
    
    
    function makeItemLinks(key, linksLi) {
        //add edit single item link
        
        var editLink = $('<a class="padRight"></a>');
                editLink.attr("href", "#");
                editLink.attr("key", key);
                editLink.html("Edit Event");
                editLink.on("click", editItem);
                editLink.appendTo(linksLi);
        
 
        //add line break
        var breakTag = $("<br>");
        linksLi.append(breakTag).appendTo("#display");
 
 
        //delete link
        deleteLink = $('<a class="padLeft"></a>');
                deleteLink.attr("href", "#");
                deleteLink.attr("key", key);
                deleteLink.html("Delete Event");
                deleteLink.on("click", deleteItem);
                deleteLink.appendTo(linksLi);
        
      
 
 
 
    };
    
    function editItem() {
        //Grab the data from our item from local storage.
        var key = $(this).attr("key");
        var item = JSON.parse(localStorage.getItem(key));
        console.log(key);
        console.log(localStorage);
        var saveLink = $("#saveEvent");
        //shows the form
 
        //populate the form files with the current localStorage values
        
        $("#select-choice-1").val(item.group[1]);
        $("#firstName").val(item.firstName[1]);
        $("#lastName").val(item.lastName[1]);
        $("#address").val(item.address[1]);
        $("#city").val(item.city[1]);
        $("#state").val(item.state[1]);
        $("#phoneNumber").val(item.phoneNumber[1]);
        $("#email").val(item.email[1]);
        //gE("timeOfEvent").value = item.timeEVent[1];
        $("#mydate").val(item.date[1]);
        $("#textBox").val(item.textBox[1]);
        $("#range").val(item.iq[1]);
        
        $.mobile.changePage("#addItem2");
 
        //remove the initial listener from the input "save contact"       
        $("#saveEvent").off("click");
        //change submit button value to edit button
        
        var editSubmit = $("#saveEvent");
        $("#saveEvent").val("Edit Contact");
        
        editSubmit.on("click", storeData);
        location.reload();
        
        
        
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
 
 
 
    };
    
    var autoFillData = function () {
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in json) {
            var id = Math.floor((Math.random() + 1) * 10000000);
            localStorage.setItem(id, JSON.stringify(json[n]));
 
 
        }
 
 
    };
    
    
    
    //show data
    var dataLoop = function () {
    
    if (localStorage.length === 0)
        {
            alert("No data stored. Dummy data will be inserted.");
            autoFillData();
        }
 
	var makeList = $("#display");
	$("#display").show();
	
	

 
        for (var i = 0, l = localStorage.length; i < l; i++)
        {
            var makeLi = $("<li></li>");
            makeList.append(makeLi);
            
            var linksLi = $('<li class="padBottom"></li>');
            
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            var otherList = $("<ul></ul>");
            makeLi.append(otherList);
            
            var item = JSON.parse(value);
            getImage(item.group[1], otherList);
            for (var tag in item)
            {
                var subLi = $("<li></li>");
                makeList.append(subLi);
                
                subLi.html(item[tag][0] + " " + item[tag][1]);
                makeList.append(linksLi);
            }
 
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
        }
 
 
    };
    
    
    //display button action
    $("#displayStoredData").on("click", function() {
    	console.log(localStorage);
         dataLoop();
        
 
 
    });
 
 
 
 
    //Submit
    
    $("#saveEvent").on("click", function() {
    validate();

        dataLoop();
 
 
    }); //end submit

    function deleteItem()
    {
        var toDelete = confirm("Are you sure you want to remove this event?");
        if (toDelete)
        {
            var key = $(this).attr('key');
            alert("Event was deleted.");
            localStorage.removeItem(key);
            $("#display").html("");
            $.mobile.changePage("#home");
        }
        else
        {
            alert("Event was not removed.");
        }
    }
 
    
    $("#clearStoredData").on("click", clearLocal);
 
    function clearLocal() {
        if (localStorage.length === 0) {
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
        }
    }
 
 
 
 
 
});

   $("#displayPage").on("pageinit", function () {
	    	//displayPage code here
	    	$("#display").empty();
 
 
 
 
    }); 
    
    
    $("#editPage").on("pageinit", function () {
	    	//editPage code here
 
 
 
 
 
    }); 
    
    $("#about").on("pageinit", function () {
	    	//displayPage code here
 
 
 
 
 
    }); 
    
    $("#birthday").on("pageinit", function () {
	    	//birthday code here
 
 
 
 
 
    }); 
    
    $("#babyShower").on("pageinit", function () {
	    	//babyShower code here
 
 
 
 
 
    }); 
    
    $("#dinnerParty").on("pageinit", function () {
	    	//dinnterParty code here
 
 
 
 
 
    }); 
    
    $("#bookSigning").on("pageinit", function () {
	    	//bookSigning code here
 
 
 
 
 
    }); 
    
    $("#wedding").on("pageinit", function () {
	    	//wedding code here
 
 
 
 
 
    }); 
    
    $("#meeting").on("pageinit", function () {
	    	//meeting code here
 
 
 
 
 
    }); 
    
    $("#kidsEvent").on("pageinit", function () {
	    	//kidsEvent code here
 
 
 
 
 
    });
    
    $("#sportingEvent").on("pageinit", function () {
	    	//sportingEvent code here
 
 
 
 
 
    });
    
    $("#movies").on("pageinit", function () {
	    	//movies code here
 
 
 
 
 
    });
    
    $("#concert").on("pageinit", function () {
	    	//concert code here
 
 
 
 
 
    });
    
    $("#entertainment").on("pageinit", function () {
	    	//entertainment code here
 
 
 
 
 
    });
    
    //loadJsonData
    
    $("#jsonButtn").on("click", function(){
		console.log("Starting JSON");
		$("#jsonList").empty();
		//AJAX call for JSON data
		$.ajax({
			url: "xhr/data.json",
			type: "GET",
			dataType: "json",
			success: function(json){
				alert("JSON data retrieved successfully!");
				console.log(json);
				for(var i = 0, j = json.Events.length; i < j; i++){
                    var jsonEvents = json.Events[i];
                    console.log(jsonEvents);
                    console.log(jsonEvents.state);
                    $('' +
	                    '<li><p> Event:' + jsonEvents.group + '</p>'+
	                    '<p> First Name:' + jsonEvents.firstName + '</p>'+
	                    '<p> Last Name:' + jsonEvents.lastName + '</p>'+
	                    '<p> Address:' + jsonEvents.address + '</p>'+
	                    '<p> City' + jsonEvents.city + '</p>'+
	                    '<p> State:' + jsonEvents.state + '</p>'+
	                    '<p> Phone Number:' + jsonEvents.phoneNumber + '</p>'+
	                    '<p> Email:' + jsonEvents.email + '</p>'+
	                    '<p> Time Of Event:' + jsonEvents.timeEVent + '</p>'+
	                    '<p> Date:' + jsonEvents.date + '</p>'+
	                    '<p> Comments:' + jsonEvents.textBox + '</p>'+
	                    '<p> Priority Meter:' + jsonEvents.iq + '</p></li>'
	                    
                    ).appendTo('#jsonList');   
                }
				$("#jsonList").listview('refresh');
			},
			error: function(result){
			console.log(result);
				console.log(result);
			}
		});
	});
	
	//load XML
	$("#xmlButtn").on("click", function(){
		console.log("Starting XML");
		$("#xmlContent").empty();
		//AJAX call for XML data
		$.ajax({
			url: "xhr/data.xml",
			type: "GET",
			dataType: "xml",
			success: function(xml, status, data){
				alert("XML data retrieved successfully!");
				console.log(status, xml);          
	            $(xml).find("Event").each(function(){
	                var group = $(this).find('group').text(),
	                	firstName = $(this).find('firstName').text(),
	                	lastName = $(this).find('lastName').text(),
	                	address = $(this).find('address').text(),
	                	city = $(this).find('city').text(),
	                	state = $(this).find('state').text(),
	                	phoneNumber = $(this).find('phoneNumber').text(),
	                	email = $(this).find('email').text(),
	                	timeEVent = $(this).find('timeEVent').text(),
	                	date = $(this).find('date').text(),
	                	textBox = $(this).find('textBox').text(),
	                	iq = $(this).find('iq').text();
	                	
	                $('' +
                        '<li>' + group + '</li>' +
                        '<li>' + firstName + '</li>' +
                        '<li>' + lastName + '</li>' +
                        '<li>' + address + '</li>' +
                        '<li>' + city + '</li>' + 
                        '<li>' + state + '</li>' +
                        '<li>' + phoneNumber + '</li>' +
                        '<li>' + email + '</li>' +
                        '<li>' + timeEVent + '</li>'+
                        '<li>' + date + '</li>'+
                        '<li>' + textBox + '</li>'+
                        '<li>' + iq + '</li>'
	                ).appendTo('#xmlList');
	            });
				 $("#xmlContent").listview('refresh');
			},
			error: function(status, result){
				console.log(status, result);
			}
		});
	});
	
	
    
    
    
    
    
    
 
  






