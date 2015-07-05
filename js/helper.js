/*global google*/
/*global data*/

var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<br><span>%data%</span>";

var HTMLcontactGeneric = "<li><span class='green-text'>%contact%</span><span class='green-text'>%data%</span></li>";
var HTMLmobile = "<li class='flex-item'><span class='green-text'>mobile</span><span class='green-text'>%data%</span></li>";
var HTMLemail = "<li class='flex-item'><span class='green-text'>email</span><span class='green-text'>%data%</span></li>";
var HTMLtwitter = "<li class='flex-item'><span class='green-text'>twitter</span><span class='green-text'>%data%</span></li>";
var HTMLgithub = "<li class='flex-item'><span class='green-text'>github</span><span class='green-text'>%data%</span></li>";
var HTMLblog = "<li class='flex-item'><span class='green-text'>blog</span><span class='green-text'>%data%</span></li>";
var HTMLlocation = "<li class='flex-item'><span class='green-text'>location</span><span class='green-text'>%data%</span></li>";

var HTMLskillsStart = "<h3 id='skillsH3' class='skills-title'>Skills at a Glance:</h3><ul id='skills' class='flex-box'></ul>";
var HTMLskills = "<li class='flex-item'><span class='green-text'>%data%</span></li>";

var HTMLworkStart = "<div class='work-entry'></div>";
var HTMLworkEmployer = "<a href='%url%'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div class='date-text'>%data%</div>";
var HTMLworkLocation = "<div class='location-text'>%data%</div>";
var HTMLworkDescription = "<p><br>%data%</p>";

var HTMLprojectStart = "<div class='row project-entry'></div>";
var HTMLprojectTitle = "<div class='col-md-8'><a href='#'>%data%</a>";
var HTMLprojectDates = "<div class='date-text'>%data%</div>";
var HTMLprojectDescription = "<p><br>%data%</p></div>";
//TODO: Add alt text for images
var HTMLprojectImage = "<div class='col-md-2 project-image'><img src='%data%' class='img-responsive'></div>";

var HTMLschoolStart = "<div class='education-entry'></div>";
var HTMLschoolName = "<a href='#'>%data%";
var HTMLschoolDegree = " -- %data%</a>";
var HTMLschoolDates = "<div class='date-text'>%data%</div>";
var HTMLschoolLocation = "<div class='location-text'>%data%</div>";
var HTMLschoolMajor = "<em><br>Major: %data%</em>";

var HTMLonlineClasses = "<h3>Online Classes</h3>";
var HTMLonlineStart = "<div class='col-md-8 online-course'>";
var HTMLonlineTitle = "%data%";
var HTMLonlineSchool = " - %data%";
var HTMLonlineDates = "<div class='date-text'>%data%</div>";
var HTMLonlineURL = "<a href='%data%'>%data%</a>";
var HTMLonlineCertificate = "<a href='%data%'>Obtained certificate of accomplishment</a>";

var internationalizeButton = "<button>Internationalize</button>";
var googleMap = "<div id='google-map' class='google-map'></div>";

/**
Generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable

/**
 * initializeMap() is called when page is loaded.
 */
function initializeMap() {
    "use strict";
    var locations,
        mapOptions = {
            disableDefaultUI: true
        };

    // This next line makes `map` a new Google Map JavaScript Object and attaches it to
    // <div id="map">, which is appended as part of an exercise late in the course.
    map = new google.maps.Map(document.querySelector('#google-map'), mapOptions);


    /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
    function locationFinder() {
        var school, job,
            // initializes an empty array
            locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array
        for (school = 0; school < education.schools.length; school += 1) {
            locations.push(education.schools[school].location);
        }

        // iterates through work locations and appends each location to
        // the locations array
        for (job = 0; job < work.jobs.length; job += 1) {
            locations.push(work.jobs[job].location);
        }

        return locations;
    }

    /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.k, // latitude from the place service
            lon = placeData.geometry.location.B, // longitude from the place service
            name = placeData.formatted_address, // name of the place from the place service
            bounds = window.mapBounds, // current boundaries of the map window

            // marker is an object with additional data about the pin for a single location
            marker = new google.maps.Marker({
                map: map,
                position: placeData.geometry.location,
                title: name
            }),

            contentString = '<div id="bodyContent">' + '<p>' + name + '</div>',

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function () {
            // your code goes here!
            infoWindow.open(map, marker);
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map),
            place,
            request;

        // Iterates through the array of locations, creates a search object for each location
        for (place = 0; place < locations.length; place += 1) {

            // the search request object
            request = {
                query: locations[place]
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        }
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

}

/*
Uncomment all the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

$(document).click(function (loc) {
    console.log("x location:  " + loc.pageX + " y location: " + loc.pageY);
});
