import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "app-page-not-found",
    styleUrls: [ "./pageNotFound.component.scss" ],
    templateUrl: "./pageNotFound.component.html"
})

export class PageNotFound implements OnInit, OnDestroy {

    first_name: string;
    last_name: string;
    username: string;
    authorities: Array<any>;
    roles: Array<any>;
    modules: Array<any>;
    toastFlag: boolean;

    constructor(
        private _activatedRoute: ActivatedRoute
    ) {}

    // life cycle hook that will run when the component will be loaded on the DOM.
    ngOnInit() {
        this.first_name = "Aziz";
        this.last_name = "Ansari";
        this.authorities = [];
        this.roles = [
            {
                "id": 1,
                "name": "NEW",
                "description": "No Access"
            },
            {
                "id": 3,
                "name": "VIEW",
                "description": "Viewer"
            },
            {
                "id": 4,
                "name": "MODIFY",
                "description": "User"
            },
            {
                "id": 5,
                "name": "ADMIN",
                "description": "Admin"
            }
        ];
        this.modules = [
            {
                "id": 2,
                "name": "AMAZE_MOBILE",
                "description": "Mobile"
            },
            {
                "id": 3,
                "name": "AMAZE_TOUCH",
                "description": "Touch"
            },
            {
                "id": 4,
                "name": "CODING_REVIEW",
                "description": "Coding Review"
            },
            {
                "id": 5,
                "name": "BOND",
                "description": "Bond"
            }
        ];

        this.toastFlag = true;
        setTimeout(() => {
            this.toastFlag = false;
        }, 3000);
    }


    onClick() {
        // console.log("Inside on click of the Button in the Page Component");
        // this._dummyService.headingSubject.next("Serarch User");
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
    onModalSubmit() {
        console.log("Submit button is clicked and modal is dismissed");
    }

    // life cycle hook that will run before the component will be destroyed.
    ngOnDestroy() {

    }
}