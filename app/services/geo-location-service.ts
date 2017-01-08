import {Injectable, provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeoLocationService {
	
	public getLocation(opts): Observable<any> {
		
		return Observable.create(observer => {
			
		    if (window.navigator && window.navigator.geolocation) {
				
		    	window.navigator.geolocation.getCurrentPosition(
                        (position)=> {
                            observer.next(position);
                        },
                        (error)=> {
                             switch (error.code) {
                                    case 1:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                                        break;
                                    case 2:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                                        break;
                                    case 3:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                                        break;
                             }
                        },
					    opts
		    	);
				
		    }
			else{
				observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}
			
		});
	}
	
	public getLocation1(opts): Promise<any> {
		
		return new Promise( (resolve) => {
			
		    if (window.navigator && window.navigator.geolocation) {
				
		    	window.navigator.geolocation.getCurrentPosition(
                        (position)=> {
							resolve(position);
                        },
                        (error)=> {
                             switch (error.code) {
                                    case 1:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                                        break;
                                    case 2:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                                        break;
                                    case 3:
                                        observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                                        break;
                             }
                        },
					    opts
		    	);
				
		    }
			else{
				resolve(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}
			
		});
	}
	
	public getGoogleClientLocation() : Promise <any> {
		if(google.loader.ClientLocation){
			resolve(google.loader.ClientLocation);
		}
		else{
			resolve(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
		}
	}
}
export var geoLocationServiceInjectables: Array<any> = [
  provide(GeoLocationService, { useClass: GeoLocationService })
];