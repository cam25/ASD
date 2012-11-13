$('#Home').on('pageinit', function () {
    //code needed for home page goes here
    console.log("Page one loaded.");
 
 
 
});

$('#addItem2').on('pageinit', function () {
console.log("addItem Page Loaded");
 
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
    
    var changePage = function(pageID){
         $('#' + pageID).trigger('pageinit');
         $.mobile.changePage($('#' + pageID),{transition:'slide'});
	 }
    
    var storeData = function(key){	
		
		var item 				= {};
			item.group		= $('#select-choice-1').val();
			item.firstName	= $('#firstName').val();
			item.lastName		= $('#lastName').val();
			item.address	= $('#address').val();
			item.city		= $('#city').val();
			item.state		= $('#state').val();
			item.phoneNumber 			= $('#phoneNumber').val();
			item.email		= $('#email').val();
			item.date		= $('#mydate').val();
			item.textBox	= $('#textBox').val();
			item.range			= $('#range').val();	
			//Changes id to the correct format in CouchDB
			item["_id"] = "Event:" + $('#select-choice-1').val() + ":" + $('#firstName').val();
		$.couch.db("asdproject").saveDoc(item, {
			success: function(data) {
				//Console logs the id in the correct format
				data.id = "Event:" + $('#firstName').val() + ":" + $('#lastName').val();
				console.log(data);
			},
			error: function(status) {
				console.log(status);
			}
		});
		alert("Event saved to index!");
		changePage("displayPage");
		
	}; 

	var save = $('#saveEvent');
	save.on("click", validate);
	



$("#displayPage").live("pageshow", function() {
console.log("DisplayPage Loaded");
	$.couch.db("asdproject").view("app/Events", {
		success: function(data) {
			//console.log(data);
			$("#display").empty();
			$.each(data.rows, function(index, event) {
			
					var key = event.id;
					var group = event.value.group;
					var firstName = event.value.firstName;
					var lastName = event.value.lastName;
					var address = event.value.address;
					var city = event.value.city;
					var state = event.value.state;
					var phoneNumber = event.value.phoneNumber;
					var email = event.value.email;
					var date = event.value.mydate;
					var textBox = event.value.textBox;
					var iq = event.value.range;
				
				
					$("<li>").append($("<a>").attr("href", "details.html?Events=" + key).text(group)).appendTo("#display");
					
			});
			
				$("#display").listview("refresh");
		}
	});
});




$(document).on("pageshow", "#details", function() {

var urlVars = function() {
		var urlData = $($.mobile.activePage).data("url");
		console.log(urlData);
		var urlParts = urlData.split('?');
		var urlPairs = urlParts[1].split('&');
		var urlValues = {};
		for (var pair in urlPairs) {
			var keyValue = urlPairs[pair].split('=');
			var key = decodeURIComponent(keyValue[0]);
			var value = decodeURIComponent(keyValue[1]);
			urlValues[key] = value;
 		}
 		console.log(urlValues);
		return urlValues;
	}
	
var details = urlVars()["Events"];
	$('#editItemLink').on("click", function(){

  $.couch.db("asdproject").openDoc(details, {
    success: function(data) {
    var idValue = data.id
	var revValue = data.rev
		console.log(idValue);
        console.log(data);
        console.log(data.group);
        console.log(data.mydate);
        var editDoc = function() {
        var item 				= {};
			$('#select-choice-1').val(data.group);
			$('#firstName').val(data.firstName);
			$('#lastName').val(data.lastName);
			$('#address').val(data.address);
			$('#city').val(data.city);
			$('#state').val(data.state);
			$('#phoneNumber').val(data.phoneNumber);
			$('#email').val(data.email);
			$('#mydate').val(data.date);
			$('#textBox').val(data.textBox);
			$('#range').val(data.iq);
        
        $.mobile.changePage("#addItem2");
 
        //remove the initial listener from the input "save contact"       
        $("#saveEvent").off("click");
        //change submit button value to edit button
        
        var editSubmit = $("#saveEvent");
        $("saveEvent").val("Edit Contact");
console.log(editSubmit);
        //save the key value established in this function as a property of the edit Submit event
        editSubmit.on("click", validate);
        editSubmit.key = this.key;
 
        };
        editDoc(idValue,revValue)
    },
    error: function(status) {
        console.log(status);
    }
});
	});
	
	$("#deleteItemLink").on('click', function(){
				//Remove document by id
				var idValue = data.id
				var revValue = data.rev
				$.couch.db("asdproject").removeDoc(idValue,revValue, {
					success: function(data){
						console.log(data);
						if(ask){
							alert("Comic was deleted!");
							window.location.reload();
						}else{
							alert("Comic was NOT deleted!");
						}	
					},
					error: function(status){
						console.log(status);
					}
				});
			});
        

var details = urlVars()["Events"];
console.log(details);
	$.couch.db("asdproject").openDoc(details, {
    success: function(data) {
    	
    		$('' +
            		'<li><p> Event: ' + data.group + '</p>'+
            		'<p> First Name: ' + data.firstName + '</p>'+
                    '<p> Last Name: ' + data.lastName + '</p>'+
                    '<p> Address: ' + data.address + '</p>'+
                    '<p> City: ' + data.city + '</p>'+
                    '<p> State: ' + data.state + '</p>'+
                    '<p> Phone Number: ' + data.phoneNumber + '</p>'+
                    '<p> Email: ' + data.email + '</p>'+
                    '<p> Date: ' + data.mydate + '</p>'+
                    '<p> TextBox: ' + data.textBox + '</p>'+
                    '<p> Range: ' + data.range + '</p></li>'
				
					).appendTo('#detailItems');
        console.log(data);
        console.log("Item Loaded!");
        
       
      
        
    },
    error: function(status) {
        console.log(status);
    }
});
	});
});