
// STICKY TOP NAV FUNCTIONALITY -- When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
// END STICKY TOP NAV FUNCTIONALITY

var reservationData = {};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6fMtmAyWl2Y4BJjxZg7JMP2rcGwcJgv4",
  authDomain: "reservation-site-af04a.firebaseapp.com",
  databaseURL: "https://reservation-site-af04a.firebaseio.com",
  projectId: "reservation-site-af04a",
  storageBucket: "",
  messagingSenderId: "258056175991"
};
  
firebase.initializeApp(config);

var database = firebase.database();


// day picker - set the day when option is clicked
$('.reservation-day li').click(function() {
  reservationData.day = $(this).text();
});

// when clicked, the name data should be set
// and all data should be sent to your database
$('#reserver-form').on('submit', function(event) {
  // prevent reloading
  event.preventDefault();

  // get name from input
  reservationData.name = $('#name').val();

  // push configured data object to database
  database.ref('reservations').push(reservationData);
});

// on initial load and addition of each reservation update the view
// when an item is added, this pings firebase database "reservation-site", object called "reservations"
database.ref('reservations').on('child_added', function(snapshot) {
  // ..grab element to hook to
  var reservationList = $('.reservation-list');
  // ..get data from database
  var reservations = snapshot.val();
  // ..get your template from your script tag
  var source   = $("#reservations-list").html();
  // ..compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.prepend(reservationTemplate);
});


