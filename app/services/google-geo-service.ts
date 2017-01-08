import {Injectable, provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GoogleGeoService {
	//http;
	
	constructor() {
        //this.http = http;
	}
	
	getGoogleClientLocation() : Promise <any> {
		
		return new Promise( (resolve) => {
		    alert(1)
		    if(google.loader.ClientLocation){
		    	alert(2)
		    	var locationData = {
		    		'latitude' : google.loader.ClientLocation.latitude,
		    		'longitude' : google.loader.ClientLocation.longitude,
		    		'city' : google.loader.ClientLocation.city,
		    		'region' : google.loader.ClientLocation.region,
		    		'country' : google.loader.ClientLocation.country,
		    		'country_code' : google.loader.ClientLocation.country_code
		    	};
		    	alert(3)
		    	resolve(locationData);
		    }
		    else{
		    	resolve(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
		    }
		});
	}
	
	getLocationByPosition(lat, longt) : Promise<any> {
		let x = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+longt+"&key=AIzaSyDlrU5dzyO31HjvYPPB4IoMcPlQMJpV0g4";
		alert(x);
		return this.http.get(x).map(res =>  res.json())
	
	}
	
}
export var googleGeoServiceInjectables: Array<any> = [
  provide(GoogleGeoService, { useClass: GoogleGeoService })
];