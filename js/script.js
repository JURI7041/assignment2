/*--- ERROR POP-UP (used by the register and booking forms) ---*/
 
// shows a pop-up window that lists every error found
function showErrors(errMsg) {

    errMsg = "<div id ='scrnOverlay'></div>"
            + "<section id='errWin' role='alert'><ul>"
            +errMsg
            +"</ul><a href= '#' id= 'errBtn' class='button'>Close</a></section>";

    // works out how tall the window needs to be (more errors = taller window)
    var numOfItems = ((errMsg.match(/<li>/g)).length) * 1.5 + 4; // works out how tall the window needs to be 
    
    $("body").append(errMsg);    // adds the pop up html to the page

    //shows the dark overlay, blocks clicks on the form 
	$("#scrnOverlay").css('visibility', 'visible'); 

    // sets the window height
	$("#errWin").css('height', numOfItems.toString() + 'em'); 

    // moves the window up by half its height so it stays centred
	$("#errWin").css('margin-top', (numOfItems/-2).toString() + 'em');  

    //shows the pop up window
	$("#errWin").show();    

    // when Close is clicked, remove the overlay and the window
    $("#errBtn").click(function () {   
	    $("#scrnOverlay").remove();  
        $("#errWin").remove(); 
		});

}

//  checks the email format
function validEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;     // no spaces or @, then @, then text, a dot, then text
    return pattern.test(email);     // true if it matches, false if not
}

/*--- REGISTER PAGE ---*/

function validateRegister() {       // runs when the register form is submitted

    // reads the values the user entered
	var username = $("#username").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var password = $("#password").val();
	var confirmPassword = $("#confirmPassword").val();
	var country = $("#country").val();

    var genderM = $("#genderM").prop("checked");
	var genderF = $("#genderF").prop("checked");
    var numGenres = $("input[name = 'genres']:checked").length; // amount of boxes ticked

    var errMsg = "";								// stores the error messages
	var result = true;								// assumes no errors


    // username: not empty, at least 5 characters, letters/numbers/underscores only
    if (username == "") {								
		errMsg += "<li>Username cannot be empty.</li>"; // add this error to the list (+= means "add on the end")
	
    } else if (username.length < 5) {
        errMsg += "<li>Username must be at least 5 characters.</li>";
    } else if (!username.match(/^[a-zA-Z0-9_]+$/)) {    // ! means "not": it has a character that is not a letter, number or _
        errMsg += "<li>Username can only contain letters, numbers and underscores.</li>";
    }
   
    // email: not empty and a valid format
    if (email == "") {								
		errMsg += "<li>Email cannot be empty</li>";
	} else if (!validEmail(email)) {
        errMsg += "<li>Email is not a valid email address.</li>";
    }


    // phone: not empty, digits only, 8 to 15 digits
	if (phone == "") {								
		errMsg += "<li>Phone number cannot be empty.</li>";
	} else if (!phone.match(/^[0-9]{8,15}$/)) {     // not 8 to 15 digits only
        errMsg += "<li>Phone number must be 8 to 15 digits (numbers only).</li>";
    }


    // password: at least 10 characters with upper, lower, number and special character
	if (password == "") {							
		errMsg += "<li>Password cannot be empty</li>";
	} else {
        if (password.length < 10 ) {
        errMsg += "<li>Password must be at least 10 characters.</li>";
         }

        if (!password.match(/[A-Z]/)) {
        errMsg += "<li>Password must have an uppercase letter.</li>";
        }

        if (!password.match(/[a-z]/)) {
        errMsg += "<li>Password must have a lowercase letter.</li>";
        }

        if (!password.match(/[0-9]/)) {
        errMsg += "<li>Password must have a number.</li>";
        }

        if (!password.match(/[^a-zA-Z0-9]/)) {      // no character that is not a letter or digit
        errMsg += "<li>Password must have a special character.</li>";
        }
    }

    // confirm password: not empty and must match the password
	if (confirmPassword == "") {								
		errMsg += "<li>Confirm password cannot be empty</li>";
	} else if (password != confirmPassword) {
        errMsg += "<li>Passwords do not match.</li>";
    }

    // gender, genre, country must be chosen
	if ((!genderM)&&(!genderF)) {				// neither Male nor Female is selected
		errMsg += "<li>A gender must be selected.</li>";
	}

    if (numGenres == 0) {	
		errMsg += "<li>Choose at least one preferred genre.</li>";
	}
	
    if (country == "") {				
		errMsg += "<li>A country must be selected.</li>";
	}

    // if there are any errors, show them and stop the form from being submitted
    if (errMsg != "") {
        showErrors(errMsg);
        result = false;     // false stops the form being submitted
    }
    return result;  
}

/*--- BOOKING PAGE ---*/

function validateBooking() {
    // reads the values the user entered
    var fullName = $("#fullName").val();
    var email = $("#email").val();
	var phone = $("#phone").val();
	var movie = $("#movie").val();
	var screening = $("#screening").val();
	var tickets = $("#tickets").val();

    var voucher = $("#payVoucher").prop("checked");     // true if Voucher is selected
	var online = $("#payOnline").prop("checked");

	var cardType = $("#cardType").val();
	var cardNumber = $("#cardNumber").val();
	var billingEmail = $("#billingEmail").val();

    var errMsg = "";    // stores the error messages
	var result = true;  // assumes there are no errors

    // full name: not empty
    if (fullName == "") {								
		errMsg += "<li>Full name cannot be empty.</li>";
    }

    // email cant be empty and a valid format
    if (email == "") {								
		errMsg += "<li>Email cannot be empty</li>";
	} else if (!validEmail(email)) {
        errMsg += "<li>Email is not a valid email address.</li>";
    }

    // phone: not empty, digits only, at least 10 digits
	if (phone == "") {								
		errMsg += "<li>Phone number cannot be empty.</li>";
	} else if (!/^[0-9]{10,}$/.test(phone)) {       // not digits only, or fewer than 10 digits
        errMsg += "<li>Phone number must have at least 10 digits (numbers only).</li>";
    }

    // a movie must be chosen
    if (movie == "") {								
		errMsg += "<li>A movie must be selected.</li>";
    }

    // screening date and time must be filled and not in the past
    if (screening == "") {								
		errMsg += "<li>Screening date and time cannot be empty.</li>";
	} else if (new Date(screening) < new Date()) {      // chosen date is earlier than right now
        errMsg += "<li>Screening date and time cannot be in the past.</li>";
    }

    // number of tickets must be greater than 0
    if (tickets == "" || tickets < 1) {								
		errMsg += "<li>Number of tickets must be greater than 0.</li>";
    }

    // payment method must be chosen
    if ((!voucher) && (!online)) {
        errMsg += "<li>A payment method must be selected.</li>";
    }

    // online payment: card number must be digits only and the right length
    if (online) {
        if (cardNumber == "") {
            errMsg += "<li>Card number cannot be empty.</li>";

        } else if (!cardNumber.match (/^[0-9]+$/)) {
            errMsg += "<li>Card number must be digits only.</li>";
    
        } else if (cardType == "Amex" && cardNumber .length != 15) {
            errMsg += "<li>Amex card number must be 15 digits.</li>";
    
        } else if (cardType != "Amex" && cardNumber.length != 16) {
            errMsg += "<li>" + cardType + " card number must be 16 digits.</li>";
        }
    }
    // voucher code does not need to be validated

    // billing email: not empty and a valid format
    if (billingEmail == "") {
        errMsg += "<li>Billing email cannot be empty.</li>";
    } else if (!validEmail(billingEmail)) {
        errMsg += "<li>Billing email is not a valid email address.</li>";
    }

    // if there are any errors, show them and stop the form from being submitted
    if (errMsg !=""){
        showErrors(errMsg);
        result = false;
    }
    return result;
}

// works out the ticket price and the total cost
function updatePrice() {
    // the price stored in data-price (turned into a number)
    var price = Number ($("#movie option:selected") .data("price"));    
    if (isNaN(price)){
        price = 0;
    }

    var tickets = $("#tickets").val();
    if (tickets == "" || tickets < 1) {
        tickets = 0;
    }
    $("#price").val("$" + price.toFixed(2));
    $("#totalCost").val("$" + (price * tickets).toFixed (2));
}

// shows the voucher box or the card boxes depending on the payment method
function showPaymentFields() {
    if ($("#payVoucher") .prop ("checked")) {
        $("#voucherSection" ) .show();
        $("#cardSection") .hide();
    }  else if ($("#payOnline") .prop ("checked" )) {
        $("#cardSection").show();
        $("#voucherSection") .hide();
    } else {
        $("#voucherSection" ).hide();
        $("#cardSection") .hide();
    }
}

// copies the email into the billing email when 'same as email address' is ticked
function copyEmail() {
    if ($("#sameEmail").prop ("checked")) {
        $("#billingEmail").val($("#email").val());
    }
}

//picks the movie sent from the movies page or the recommendation page (booking.html?movie=Title)
function prefillMovie() {
    var params = new URLSearchParams(window.location.search);   // reads everything after the ? in the address
    var title = params.get("movie");    // the value of "movie"
    if (title != null) {   
        $("#movie").val(title); // select that movie in the dropdown
        
        if ($("#movie").val() == null) { // the title was not in the dropdown
            $("#movie").val("");
        }
    }
}

// loads movies.xml and adds one <option> to the dropdown for every movie in the file 
function loadMovies(){
    $.ajax({
        url:"movies.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("movie").each(function () {

                var title = $(this).find("title").text();
                var price = $(this).find("price").text();

                // data-price keeps the price so updatePrice() can read it later
                $("#movie").append("<option value='" + title + "' data-price='" + price + "'>" + title + "</option>");
            });

            // the dropdown is now full, so select the movie from the address and update the price
            prefillMovie();
            updatePrice();
        },
        error: function () {
            $("#movieError").text("Sorry, the movie list could not be loaded.");

        }

        
    });
}

/*--- RECOMMENDATION PAGE ---*/


function pickMovie(genre, age, viewing){
    // rule 1: children are always recommended the G-rated movie
    if (age == "Child") {
        return {title: "Lion King", reason: "Children are always recommended the G-rated animated movie."};
    } 
    

    // rule 2 family viewing
    if (viewing == "Family") {
        if (genre == "Comedy") {
            return {title: "White Chicks", reason: "For a family comedy night we picked a light-hearted PG-13 comedy."};
        } 

        return {title: "Lion King", reason: "For family viewing we picked the G-rated movie that suits everyone."};
        }
    

    // rule 3 choose by genre, then adjust for the viewing preference
    if (genre == "Action") {
        if (viewing == "Date Night") {
            return {title: "How to Lose a Guy in 10 Days", reason: "You like action but chose a date night, so we picked a romantic comedy."};
        }
        return {title: "The Maze Runner", reason: "A fast-paced action adventure for action fans."};
    

    } else if (genre == "Comedy") {
        if (viewing == "Date Night") {
            return {title: "How to Lose a Guy in 10 Days", reason: "You like comedy and chose a date night, so we picked a romantic comedy."};
        }
        return {title: "White Chicks", reason: "A loud, silly comedy for comedy fans."};
    
    } else if (genre == "Romance") {
        return {title: "How to Lose a Guy in 10 Days", reason: "A charming romantic comedy for romance fans."};

    } else if (genre == "Animation") {
        return {title: "Lion King", reason: "A moving animated musical for animation fans."};
    }   

    // rule 4 teens are never given MA15+ or R movies
    if (age == "Teen") {
        return {title: "The Maze Runner", reason: "Teens are not shown MA15+ or R movies, so we picked a PG-13 adventure."};
    }
    

    // rule 5: remaining adult genres
    if (genre == "Horror") {
      return {title: "Obsession", reason: "A tense psychological horror for adults who like to be scared."};
    }
    return {title: "The Godfather", reason: "A classic crime drama for adults (MA15+)."};   
}

// runs when the recommendation form is submitted
function recommend() {
    var genre = $("#genre").val();
    var age = $("input[name='ageGroup']:checked").val();
    var viewing = $ ("#viewing").val();

    // all three questions must be answered
    if (genre == "" || age == undefined || viewing == "") {
        $("#recommendError").text("Please answer all three questions.");
        $("#recommend-result").hide();
        return false;
    }

    var result = pickMovie(genre, age, viewing);

    $("#recommendError").text("");
    $("#resultTitle").text(result.title);
    $("#resultReason").text(result.reason);
 
    // the link carries the movie to the booking page (booking.html?movie=Title)
    $("#resultBookLink").attr("href", "booking.html?movie=" + encodeURIComponent(result.title));
    $("#recommend-result").show();
 
    return false;   // stops the page from reloading
}

/*--- WATCHLIST (saved in sessionStorage as JSON text) ---*/

// gets the saved watchlist as an array (empty if nothing is saved yet)
function getWatchlist(){
    var saved = sessionStorage.getItem("watchlist");
    if (saved == null){
        return[];
    }
    return JSON.parse(saved);
}

// movies page, saves the movie
function addToWatchlist(){
    var list = getWatchlist();
    var title = $(this).data("movie");
    
    // check whether the movie is already saved
    var found = false;
    for (var i =0; i < list.length; i++){
        if (list[i].title == title){
            found = true;
        }
    }

    // only add it if it is not already in the list
    if(!found) {
        list.push({
            title: title,
            genre: $(this).data("genre"),
            rating: $(this).data("rating"),
            price: $(this).data("price"),
            image: $(this).data("image")
        });
        sessionStorage.setItem("watchlist", JSON.stringify(list));
    }
    $(this).text("Added to Watchlist!");
}

// watchlist page: draws a card for every saved movie
function showWatchlist() {
    var list = getWatchlist();
    var html = "";

    for (var i = 0; i < list.length; i++) {
        var m = list[i];
        html += "<article class='movie-card'>"

            + "<img src='" + m.image + "' alt='Poster for " + m.title + "'>"
            + "<div class='movie-info'><h3>" + m.title + "</h3>"
            + "<p>Genre: " + m.genre + " | Rating: " + m.rating + " | Price: $" + Number (m.price) .toFixed (2) + "</p>"
            + "<a href='booking.html?movie=" + encodeURIComponent(m.title) + "' class='button'>Book this movie</a>"
            + "<button type='button' class='remove-btn' data-movie='" + m.title + "'>Remove</button>"
            + "</div></article>";
        }
        $("#watchlistItems").html(html);

        // show the "empty" message only when nothing is saved
        if (list.length == 0) {
            $("#emptyMessage"). show();
        } else {
            $("#emptyMessage"). hide();
    }
}

// watchlist page: removes the movie 
function removeFromWatchlist() {
    var title = $(this).data("movie");
    var list = getWatchlist();
    var newList = [];

    // keep every movie except the one being removed
    for (var i = 0; i < list.length; i++){
        if (list[i].title != title){
            newList.push(list[i]);
        }
    }
    sessionStorage.setItem("watchlist", JSON.stringify(newList));
    showWatchlist();
}

/*--- LINK EVERYTHING TO THE RIGHT EVENTS ===*/

function init() {
    // register page: validate when the form is submitted
    if ($("#regform").length > 0) {
        $("#regform").submit(validateRegister);

    }

    // booking page: validation, dynamic price, payment fields and billing email
    if ($("#bookingForm").length > 0) {
        $("#bookingForm").submit(validateBooking);
        $("#movie").change(updatePrice);
        $("#tickets").on("input", updatePrice);
        $("input[name='payment']").change(showPaymentFields);
        $("#sameEmail").change(copyEmail);
        $("#email").on("input", copyEmail);
        loadMovies();

        updatePrice();
        showPaymentFields();
    }

    // recommendation page: work out the recommendation when the form is submitted
    if ($("#recommendForm").length > 0) {
        $("#recommendForm").submit(recommend);
    }

    // movies page: "Add to Watchlist" buttons
    if ($(".watch-btn").length > 0 ) {
        $(".watch-btn").click(addToWatchlist);

        // buttons for movies that are already saved show "Added to Watchlist!"
        var list = getWatchlist();
        $(".watch-btn").each(function () {
            for (var i = 0; i < list.length; i++) {
                if (list[i].title == $(this).data("movie")) {
                    $(this).text("Added to Watchlist!");
                }
            }
        });
    }

    // watchlist page: draw the saved movies and handle "Remove"
    if ($("#watchlistItems").length > 0) {
        showWatchlist();
        $("#watchlistItems").on("click", ".remove-btn", removeFromWatchlist);

    }
}

$(document).ready(init);