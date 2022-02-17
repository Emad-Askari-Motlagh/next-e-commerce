import React from 'react'

export default function useLocation() {
    fetchNearestPlacesFromGoogle = (latitude,longitude) => {

      
        let radMetter = 2 * 1000; // Search withing 2 KM radius
    
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + 'YOUR_API_KEY'
    
        fetch(url)
          .then(res => {
            return res.json()
          })
          .then(res => {
    
          var places = [] // This Array WIll contain locations received from google
            for(let googlePlace of res.results) {
              var place = {}
              var lat = googlePlace.geometry.location.lat;
              var lng = googlePlace.geometry.location.lng;
              var coordinate = {
                latitude: lat,
                longitude: lng,
              }
    
              var gallery = []
    
              if (googlePlace.photos) {
               for(let photo of googlePlace.photos) {
                 var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference;
                 gallery.push(photoUrl);
              }
            }
    
              place['placeTypes'] = googlePlace.types
              place['coordinate'] = coordinate
              place['placeId'] = googlePlace.place_id
              place['placeName'] = googlePlace.name
              place['gallery'] = gallery
    
              places.push(place);
            }
    
            // Do your work here with places Array
          })
          .catch(error => {
            console.log(error);
          });
        
      }
    return {
        fetchNearestPlacesFromGoogle
    }
}
