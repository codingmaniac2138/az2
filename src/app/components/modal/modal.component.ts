/**
 * Modal Component for getting the data from the view
 */

 import { Component, OnInit, OnDestroy } from "@angular/core"; 
 import { ActivatedRoute } from "@angular/router";

 @Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
 })

 export class ModalComponent implements OnInit, OnDestroy {
    
    first_name: string;
    last_name: string;
    username: string;
    authorities: Array<any>;
    roles: Array<any>;
    modules: Array<any>;
    
    constructor(
        private _activatedRoute: ActivatedRoute
    ){}

    // on Init life cycle hook
    ngOnInit() {
        this.first_name = "Aziz";
        this.last_name = "Ansari";
        this.authorities = [];
        this.roles = [
            
        ];
        this.modules = [
            
        ];
    }

    onSelectionChange(role, module) {
        if("roles" in module) {
            module["roles"].push(role);
            this.authorities.push(module);
        }
        else {
            module["roles"] = [];
            module["roles"].push(role);
            this.authorities.push(module);
        }
        
        console.log("the value of the module is: "+ JSON.stringify(this.authorities));
    }

    // on Destroy life cycle hook
    ngOnDestroy() {}
 }