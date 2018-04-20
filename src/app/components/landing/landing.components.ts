import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { MODULES } from "../../models/modules.enum";

@Component({
    selector: "app-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})

export class LandingComponent implements OnInit  {
    
    module_name: string;

    constructor(
        private _activatedRoute: ActivatedRoute, 
        private _router: Router
    ) {}

    ngOnInit() {
        this._activatedRoute.params.subscribe((params: Params) => {
            this.module_name = params["module"];
            if(this.module_name === MODULES.USER_MANAGEMENT.toLowerCase()) {
                this.module_name = "User Management";
            }
        });
        // console.log("Inside the landing components"+JSON.stringify(this._activatedRoute.snapshot.params));
    }
}