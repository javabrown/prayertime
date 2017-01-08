import {Component, View, OnInit} from "angular2/core";
import {GeoLocationService} from "../services/geo-location-service";
import {GoogleGeoService} from "../services/google-geo-service";

@Component({
  selector: 'prayer-time',
  templateUrl: './app/prayer-time/prayer-time.html',
  providers: [GeoLocationService, GoogleGeoService],
  styleUrls: ['./app/prayer-time/prayer-time.scss']
})
export class PrayerTime implements OnInit {
    fajrTime;
    sunriseTime;
    dhuhrTime;
    asrTime;
    maghribTime;
    ishaTime;
 
    location = {};
    latitude = 43;
    longitude=  -80;
	
    /*ngOnInit(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
    }*/
    
    constructor(private locationService: GeoLocationService, private googleGeoService: GoogleGeoService) {
        //if(navigator.geolocation){
        //    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        //};
		
        //this.googleGeoService.getGoogleClientLocation().then(
		//    (clientLocation) => { console.log(clientLocation); alert('Google Call Done==>'+ clientLocation); }
		//);
		
		this.initLocation();
		
		this.calculatePrayerTime(this.latitude, this.longitude);
    }
    
    initLocation() {
        this.locationService.getLocation1().then(
            (position) => { this.setPosition(position); }
        );
	}
	
    public setPosition(position){
        this.location = position.coords;
	    this.latitude = position.coords['latitude'];
		this.longitude = position.coords['longitude'];
		
		//this.googleGeoService.getLocationByPosition(this.latitude, this.longitude);
		
		this.calculatePrayerTime(this.latitude, this.longitude);
		
        console.log(position.coords);
		
		//alert(this.location['latitude'] + "   " + this.location['longitude']);
    }
	
	calculatePrayerTime(latitude, longitude){
        var date = new Date(); // today
        var times = prayTimes.getTimes(date, [latitude, longitude], -5);
        var list = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    	this.fajrTime = times['fajr'];
    	this.sunriseTime = times['sunrise'];
    	this.dhuhrTime = times['dhuhr'];
    	this.asrTime = times['asr'];
    	this.maghribTime = times['maghrib'];
    	this.ishaTime = times['isha'];
	}
};