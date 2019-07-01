var map;

var cinemas = [
  {
    id: 1,
    name: 'Lighthouse Cinema Petone',
    lat: -41.225820,
    lng: 174.879555,
    dsc: 'a good and fine cinema, a good place to go for coffee and a movie by Yorgos Llanthimos',
    openingHours: {
      weekdays: '10am - 10.30pm',
      weekends: '12pm - 11.30pm'
    }
  },
  {
    id: 2,
    name: 'Lighthouse Cinema Cuba',
    lat: -41.296150,
    lng: 174.775269,
    dsc: 'a good and fine cinema, a good place to go for ice-cream and a soy flat white',
    openingHours: {
      weekdays: '10am - 10.30pm',
      weekends: '12pm - 11.30pm'
    }
  },
  {
    id: 3,
    name: 'Penthouse',
    lat: -41.305838,
    lng: 174.763470,
    dsc: 'right next to the superlative Brooklyn Deli, which is the best place in Wellington for eggs and sauerkraut on rye',
    openingHours: {
      weekdays: '4pm - 10.30pm',
      weekends: '12pm - 12am'
    }
  },
  {
    id: 4,
    name: 'Paramount',
    lat: -41.294063,
    lng: 174.782091,
    dsc: 'they are good about the IFF, and Katherine used to work there; good for free drinks (uh oh)',
    openingHours: {
      weekdays: '9am - 11.30pm',
      weekends: '12pm - 12.30am'
    }
  },
  {
    id: 5,
    name: 'Reading Courtenay',
    lat: -41.293196,
    lng: 174.780333,
    dsc: 'pretty terrible but great for $10 vodafone tickets and a bucket of popcorn the size of your head',
    openingHours: {
      weekdays: '4pm - 12.30am',
      weekends: '4pm - 12.30am'
    }
  },
  {
    id: 6,
    name: 'Reading Titahi',
    lat: -41.136527,
    lng: 174.838864,
    dsc: 'pretty terrible but great for $10 vodafone tickets and a bucket of popcorn the size of your head AND it\'s near Denny\'s',
    openingHours: {
      weekdays: '4pm - 12.30am',
      weekends: '4pm - 12.30am'
    }
  },
  {
    id: 7,
    name: 'Embassy',
    lat: -41.294281,
    lng: 174.784103,
    dsc: 'oh boy thanks Lord of the Rings for making our city so much cooler and also thanks Embassy for putting on all of those good old movies I never go to see',
    openingHours: {
      weekdays: '10am - 12.30am',
      weekends: '11am - 12.30am'
    }
  },
  {
    id: 8,
    name: 'Park Road Post Production',
    lat: -41.308192,
    lng: 174.821727,
    dsc: 'thanks for taking me here to see Alita, Liam, that was pretty amazing; marred only by the fact that kombucha tastes discomfitingly alcoholic',
    openingHours: {
      weekdays: 'by invitation~~',
      weekends: 'by invitation~~'
    }
  },
  {
    id: 9,
    name: 'Weta Cave',
    lat: -41.314384,
    lng: 174.820037,
    dsc: 'you know I\'ve never actually been there? bad wellingtonian!',
    openingHours: {
      weekdays: '12pm - 8pm',
      weekends: '12pm - 8pm'
    }
  },
  {
    id: 10,
    name: 'Home Theatre :^)',
    lat: -41.212109,
    lng: 174.925735,
    dsc: 'definitely the best place to watch films / Danish crime drama',
    openingHours: {
      weekdays: '5pm - 10pm',
      weekends: '11 am - 1am'
    }
  }
]


function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -41.279176, lng: 174.778759},
    zoom: 12,
    tilt: 45,
    fullscreenControl: false,
    maxZoom: 18,
  });


  for (var i = 0; i < cinemas.length; i++) {

    var cinemasName = cinemas[i].name;
    var cinemasLat = cinemas[i].lat;
    var cinemasLng = cinemas[i].lng;

    var marker = new google.maps.Marker({


      position: {
        lat: cinemasLat,
        lng: cinemasLng
      } ,
      map: map,
      // animation: google.maps.Animation.BOUNCE,
      icon: 'images/bluePin.png',
      markerTitle: cinemas[i].name

    });

    addClickEventToMarker(marker);
  } // for loop

  var infobox;

  var firstMarker;
  var secondMarker;

  function addClickEventToMarker(singleMarker){
    infobox = new google.maps.InfoWindow();

    if (infobox){
      infobox.close();
    }

    google.maps.event.addListener(singleMarker , 'click' , function(){
      infobox.setContent( '<div><h3>' + singleMarker.markerTitle + '</h3></div>');
      infobox.open(map, singleMarker);

      if (firstMarker){
        // console.log(firstMarker);
        // console.log('first marker has a value');

        if (secondMarker){
          firstMarker.setIcon('images/bluePin.png');
          secondMarker.setIcon('images/bluePin.png');
          secondMarker = null;
          firstMarker = singleMarker;
          singleMarker.setIcon('images/redPin.png');
          console.log('this is the first marker');

          if(directionsDisplay){
            directionsDisplay.setMap(null);
          }
        } else {
          secondMarker = singleMarker;
          singleMarker.setIcon('images/redPin.png');
          console.log('this is the second marker');
          getDirections();
          }
      } else {
        firstMarker = singleMarker;
        singleMarker.setIcon('images/redPin.png');
      }
    }); //addListener() to map event
  } //addClickEventToMarker()

  // this is where I started:

  // function getDirections(){
  //   var directionsService = new google.maps.DirectionsService();
  //   var directionsDisplay = new google.maps.DirectionsRenderer({
  //     // polylineOptions object goes here
  //   });
  //   var map = map;
  //
  //   function calcRoute() {
  //     var request = {
  //       origin: firstMarker,
  //       destination: secondMarker,
  //       travelMode: 'DRIVING'
  //     };
  //
  //     directionsService.route(request, function(result, status) {
  //       if (status == 'OK') {
  //         directionsDisplay.setDirections(result);
  //       }
  //     });
  //   }
  // }

  // this is from the class github repo :
  var directionsDisplay;

  function getDirections(){
       // console.log('show me the directions');
       var directionsService = new google.maps.DirectionsService();
       directionsDisplay = new google.maps.DirectionsRenderer({
           polylineOptions: {
               strokeOpacity: 0.5,
               strokeColor: 'red',
               strokeWeight: 10
           }
       });

       directionsDisplay.setMap(map);

       directionsService.route({
           origin: firstMarker.position,
           destination: secondMarker.position,
           travelMode: 'DRIVING'
       }, function(response, status){
           if(status == 'OK'){
               // console.log(response.routes[0].legs);
               for (var i = 0; i < response.routes[0].legs.length; i++) {
                   console.log(response.routes[0].legs[i].distance.text);
                   console.log(response.routes[0].legs[i].duration.text);
               }
               directionsDisplay.setDirections(response);


           } else if(status == 'NOT_FOUND'){
               console.log('either your origin or destination is invalid');
           } else if(status == 'ZERO_RESULTS'){
               alert('sorry there is no routes available');
           }
       })
   } // getDirections()

   var input = document.getElementById('location');
   var autoComplete = new google.maps.places.Autocomplete(input);
   autoComplete.addListener('place_changed', function(){
     // console.log('place changed.');
     var place = autoComplete.getPlace();
     console.log(place);
     // to move a map somewhere, we need to change the center location!
     // panTo() gets swapped out for setCenter if the new location is too far away for streamlined loading
     map.panTo(place.geometry.location);

     // using the place object
     var placeInfo = document.getElementById('placeInfo');
     placeInfo.innerHTML = '<h2>welcome to ' + place.name + '</h2>';
     placeInfo.innerHTML += '<img src=' + place.photos[0].getUrl() + '></img>'
   })

   addPinToMap();

   function addPinToMap(){
     map.addListener('click' , function(){
       console.log('got a click on the map');
       // getting there? can't read MouseEvent
       console.log('click lat/long were ' + google.maps.MouseEvent.LatLng.lat() + ' (lat) and ' + google.maps.MouseEvent.LatLng.lng() + ' (lng)');
     })
   }

} // initMap()

// replaces the async , defer and &callback from our HTML - it was throwing up a weird caching error? Uncaught promise vc?
google.maps.event.addDomListener(window, 'load', initMap);
