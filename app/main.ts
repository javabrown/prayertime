import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {PrayerTime} from "./prayer-time/prayer-time";

@Component({
	selector: 'rk-app',
	directives: [PrayerTime],
	templateUrl: './app/main.html',
	styleUrls: ['./app/main.scss']
})
export class Main {
	name: "Raja Khan"
};

bootstrap(Main, []);