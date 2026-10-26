COS10005 Web Development - Assignment 2
Film Finder - Movie Discovery & Ticket Booking Website
Student: Juri Alodhailah
Student ID: 106254722
-------------
MERCURY LINK
https://mercury.swin.edu.au/cos10005/s106254722/wd_assign2_106254722/index.html

-------------
GITHUB REPOSITORY
https://github.com/JURI7041/assignment2

-----------------
WEBSITE STRUCTURE
-----------------
index.html - The home page explains what the website is for, who it is meant for, and what services it offers.
movies.html - Shows six movies with details, session times, and options to book tickets or add movies to the watchlist.
recommend.html - Has a form where users can choose a genre, age group, and viewing preference to get a movie recommendation.
register.html - Includes a registration form that checks user input with JavaScript.
booking.html - Has a ticket booking form with changing prices, payment choices, and checks for correct input.
watchlist.html - Lets users add, see, and remove movies from their watchlist. 
movies.xml - Keeps movie titles, genres, ratings, and prices for the dropdown menu on the booking page.
css/style.css - A single stylesheet for all pages. It starts with mobile design, then adjusts for tablets at 768px and desktops at 1024px.
js/script.js - Contains all my JavaScript code and uses the jQuery library.
js/jquery.min.js - The jQuery 3.7.1 library is saved in the js folder and not loaded from a CDN.
images/ - This folder has the logo (logo.png) and movie posters (movie1.jpg to movie6.jpg).
 
---------------------------
JAVASCRIPT VALIDATION LOGIC
---------------------------
Registration: When the Register button is clicked, the script checks each field and creates a list of errors.
- Username: not empty, at least 5 characters, and contains only letters, numbers and underscores.
- Email: not empty and in the format name@domain.ext.
- Phone: digits only, between 8 and 15 digits.
- Password: at least 10 characters, with an uppercase letter, a lowercase letter, a number and a special character.
- Confirm password must match.
- A gender, at least one genre and a country must be chosen.
If errors are found, the form does not submit and a pop-up shows all issues. If there are no errors, the form submits.
 
Booking: Checks full name, email format, phone number (digits only, at least 10), selected movie, screening date (not in the past), ticket quantity (more than 0), and payment method. For online payments, card numbers must be digits only: 16 digits for Visa/Mastercard, 15 digits for Amex. Voucher codes are not checked. Billing email must be valid.
If errors are found, the form does not submit and a pop-up shows all issues.
 
Dynamic behavior on the booking page:
- The movie list loads from movies.xml using AJAX, so the price matches the selected movie.
- Ticket price and total cost update automatically when the selected movie or ticket quantity changes.
- Voucher or card fields show or hide depending on the selected payment method.
- Choosing "Same as Email Address" copies the email into the billing email field.
- Pre-fill: Book buttons on the movies and recommendation pages link to booking.html?movie=TITLE. The booking page uses URLSearchParams to select the right movie in the dropdown.
 
Recommendation: Uses rule-based logic, checked in this order
1. Children are always recommended the G-rated movie (Lion King).
2. Family viewing gives a family-friendly movie (White Chicks for Comedy, otherwise Lion King).
3. Otherwise, the genre decides the movie. Date Night changes the Action and Comedy picks to the romantic comedy.
4. Teens are never given MA15+ or R movies, so the remaining teen result is The Maze Runner.
5. Adults who chose Horror get Obsession, and everyone else gets The Godfather.
The result page also displays a short sentence explaining which rule was used.
 
Watchlist: Add to Watchlist buttons save movies in sessionStorage as JSON text. The watchlist page reads this data and shows the saved movies. Removing a movie deletes it from the list. The watchlist only lasts for the current browsing session.
 
KNOWN ISSUES AND LIMITATIONS
- The movie posters are third-party images used for study purposes only. They are not my own work.
- Forms are submitted to the course test server; no real payments or accounts are created.
- The watchlist is cleared when the browser tab is closed (using sessionStorage).
- Ticket price depends on the movie only. The ticket type (Adult, Child, Student) does not change the price.
- Movie prices are stored in both movies.xml and the buttons on movies.html, so both must be updated if a price changes.
 
----------
REFERENCES
----------
Movie details:
- Titles, genres, and ratings are for study purposes only. I wrote the movie descriptions in my own words.
 
Images:
All movie poster images used in this assignment are from The Movie Database. All posters are copyrighted by their respective studios and are used here for study purposes only.
- The Movie Database (2014) The Maze Runner [poster image]. Available at: https://www.themoviedb.org/movie/198663-the-maze-runner (Accessed: 20 October 2026).
- The Movie Database (2004) White Chicks [poster image]. Available at: https://www.themoviedb.org/movie/12153-white-chicks (Accessed: 20 October 2026).
- The Movie Database (1994) The Lion King [poster image]. Available at: https://www.themoviedb.org/movie/8587-the-lion-king (Accessed: 20 October 2026).
- The Movie Database (1972) The Godfather [poster image]. Available at: https://www.themoviedb.org/movie/238-the-godfather (Accessed: 20 October 2026).
- The Movie Database (2003) How to Lose a Guy in 10 Days [poster image]. Available at: https://www.themoviedb.org/movie/9919-how-to-lose-a-guy-in-10-days (Accessed: 20 October 2026).
- The Movie Database (2026) Obsession [poster image]. Available at: https://www.themoviedb.org/movie/1339713-obsession (Accessed: 20 October 2026).
- images/logo.png: is my own work, I used google gemini to generate a roll of film using my websites colour palette 
 
Other:
- OpenJS Foundation (2023) jQuery 3.7.1 [JavaScript library]. Available at: https://jquery.com/ (Accessed: 20 October 2026).
- OpenJS Foundation (2026) jQuery Learning Centre. Available at: https://learn.jquery.com/ (Accessed: 20 October 2026).
- W3Schools (2026) HTML, CSS, JavaScript and jQuery tutorials. Available at: https://www.w3schools.com/ (Accessed: 11 October 2026).
- W3C (2026) Nu Html Checker (HTML validator). Available at: https://validator.w3.org/ (Accessed: 23 October 2026).
- W3C (2026) CSS Validation Service. Available at: https://jigsaw.w3.org/css-validator/ (Accessed: 23 October 2026).
 

