import { Component, OnInit, OnDestroy } from "@angular/core"; 
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router"; 

@Component({
    selector: "app-breadcrums",
    templateUrl: "./breadcrums.component.html",
    styleUrls: ["./breadcrums.component.scss"]
})
export class BreadcrumsComponent implements OnInit, OnDestroy {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}