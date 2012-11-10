$('#Home').on('pageinit', function () {
    //code needed for home page goes here
    console.log("Page one loaded.");
 
 
 
});
 


$("#displayPage").live("pageshow", function() {
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
					var timeEVent = event.value.timeEVent;
					var date = event.value.date;
					var textBox = event.value.textBox;
					var iq = event.value.iq;
				
				
					$("<li>").append($("<a>").attr("href", "details.html?Events=" + key).text(event.value.group)).appendTo("#display");
					
			});
			
				$("#display").listview("refresh");
		}
	});
});


var urlVars = function() {
		var urlData = $($.mobile.activePage).data("url");
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


$("#details").live("pageshow", function() {

var details = urlVars()["details"];
console.log(details);
	$.couch.db("asdproject").view("app/BabyShower", {
	success: function(data) {
	$("#detailItems").empty();
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
					var timeEVent = event.value.timeEVent;
					var date = event.value.date;
					var textBox = event.value.textBox;
					var iq = event.value.iq;
			
					$('' +
            		'<li><p> firstName: ' + firstName + '</p>'+
                    '<p> lastName: ' + event.value.lastName + '</p>'+
                    '<p> address: ' + event.value.address + '</p>'+
                    '<p> city: ' + event.value.city + '</p>'+
                    '<p> state: ' + event.value.state + '</p>'+
                    '<p> phoneNumber: ' + event.value.phoneNumber + '</p>'+
                    '<p> email: ' + event.value.email + '</p>'+
                    '<p> date: ' + event.value.date + '</p>'+
                    '<p> textBox: ' + event.value.textBox + '</p>'+
                    '<p> iq: ' + event.value.iq + '</p></li>'
				
					).appendTo('#detailItems');   
        });
		$("#detailItems").listview('refresh');
        console.log(data);
    },
    error: function(status) {
        console.log(status);
    },
    reduce: false

		});
	});

