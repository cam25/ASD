$('#Home').on('pageinit', function(){
    //code needed for home page goes here
    
    
    
});    
        
$('#addItem2').on('pageinit', function(){
        
        var validate = function() {
        var evForm = $('#eventForm');
            evForm.validate({
            invalidHandler: function(form, validator) {
            },
            submitHandler: function() {
        var data = evForm.serializeArray();
            storeData(this.key);
            console.log(localStorage);
            
        }
    });
    
    
    };
    
    //any other code needed for addItem page goes here



//The functions below can go inside or outside the pageinit function for the page in which it is needed.



var autoFillData = function (){
        //The actual JSON object data required for this to work is coming from our json.js file. which is loaded from our addItem.html file.
        //Store the JSON OBJECT in local storage.
        for (var n in JSON) {
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(JSON[n]));
            

        }

     
};
		
			

		$("#editPage").on("click", editItem)

		function editItem() {
        //Grab the data from our item from local storage.
        var value = localStorage.getItem(this.key);
        var item = jQuery.parseJSON(value);
        var saveLink = $("#saveEvent");
        //shows the form

        //populate the form files with the current localStorage values
        $("#select-choice-1").val() = item.group[1];
        $("#firstName").val() = item.firstName[1];
        $("#lastName").val() = item.lastName[1];
        $("#address").val() = item.address[1];
        $("#city").val() = item.city[1];
        $("#state").val() = item.state[1];
        $("#phoneNumber").val() = item.phoneNumber[1];
        $("#email").val() = item.email[1];
        //gE("timeOfEvent").value = item.timeEVent[1];
        $("#mydate").val() = item.date[1];
        $("#textBox").val() = item.textBox[1];
        $("#range").val() = item.iq[1];

        //remove the initial listener from the input "save contact"       
        saveLink.off("click", storeData);
        //change submit button value to edit button
        $("#saveEvent").val() = "Edit Contact";
        var editSubmit = $("#saveEvent");
        //save the key value established in this function as a property of the edit Submit event
        //editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;



    };
    
    $("#displayStoredData").on("click",function getData() {

        //write Data from Local Storage to the browser.
        
        var makeList = $("<ul>");
        $("#displayPage").append(makeList);
        $(makeList).empty();
        console.log(makeList);
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeLi = $("<li></li>");
            var linksLi = $("<li></li>");
            makeList.append(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value to an object by using json.Parse
            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);
            var makeOtherList = $("<li></li>");
            makeLi.append(makeOtherList);
            getImage(item.group[1], makeOtherList);
            console.log(item.group[1]);
         for (var tag in item) {
             $('<p>' + item[tag][0] + item[tag][1] + '</p>').appendTo(makeLi);
                
            }
           
            makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links for each item in local storage
        }
        
});

function makeItemLinks(key, linksLi) {
        //add edit single item link
        var editLink = $('<a href="#" data-role="button" data-inline="true" data-mini="true" data-theme="b">Edit Event</a>');
        editLink.key = key;
        linksLi.append(editLink)

        //add line break
        var breakTag = $("<br>");
        linksLi.append(breakTag);


        //delete link
        var deleteLink = $('<a href="#" data-role="button" data-inline="true" data-mini="true" data-theme="b">Delete Event</a>');
        deleteLink.key = key;
       
        linksLi.append(deleteLink);
       

    };



    

 $("#saveEvent").on("click", validate);

    var storeData = function(key){
    if (!key) {


            var id = Math.floor(Math.random() * 1000000001);
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
    
};




    
    var    deleteItem = function (){

    var ask = confirm("Are you sure you want to delete this event?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Event was NOT removed");

        }

            
};






var getImage = function(catName, makeOtherList) {
        var imageLi = $("<li>");
        makeOtherList.append(imageLi);
        var newImage = $("<img>");
        var setSource = newImage.attr("src", "images/" + catName + ".png");
        imageLi.append(newImage);

    };





    $("clearStoredData").on("click", clearLocal) 
              
    function  clearLocal() {
    if (localStorage.length === 0) {
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
        }
            

};

console.log(localStorage.length);
    
    
 
    
    
    
});

    
    
    
