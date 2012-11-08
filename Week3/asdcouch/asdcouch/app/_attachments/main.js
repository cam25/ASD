
$(document).ready(function() {
		$.ajax({
			"url": "_view/Events",
			"dataType": "json",
			"success": function(data) {
				$.each(data.rows, function(index, Events) {
					var group = Events.value.group;
					var firstName = Events.value.firstName;
					var lastName = Events.value.lastName;
					var address = Events.value.address;
					var city = Events.value.city;
					var state = Events.value.state;
					var phoneNumber = Events.value.phoneNumber;
					var email = Events.value.email;
					var timeEVent = Events.value.timeEVent;
					var date = Events.value.date;
					var textBox = Events.value.textBox;
					var iq = Events.value.iq;
					$("#display").append(
						$("<li>").append(

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
						)
					);
				});
				$("#display").listview("refresh");
			}
		});

});
