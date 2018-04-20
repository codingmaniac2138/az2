import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { SearchService } from "../../services/search.service";
import { AuthorizationService } from "../../services/authorization.service";
import { UserProfileService } from "../../services/user-profile.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit, OnDestroy {

    // area field in the header that can be different modules like user_management, amaze_touch and other
    @Input() area: string;
    @Input() workspace: string;
    @Input() username: string;
    
    // workspace data could be search user or other things
    // workspace: string;
    workspace_flag: boolean;

    // search_active_directory flag in the query params
    search_active_directory: boolean;

    // logged in first name and last name
    first_name: string;
    last_name: string;

    // bread crums first name and last name 
    user_first_name: string;
    user_last_name: string;
    user_flag: boolean = false;

    constructor(
        private _authService: AuthorizationService,
        private _activatedRoute: ActivatedRoute,
        private _userProfileService: UserProfileService,
        private _searchService: SearchService 
    ) {}

    // In this function we have to put the value from the path and get the user's first name and last name
    // fetch user 
    ngOnInit() {
        // are and workspace for coding review
        this.area = "Coding Review";
        this.workspace = "My Tasks";
        this.username = "Sabreen Ayad";
        // end of codingreview variables
        
        // handling the search_active_directory in the header component
        this._activatedRoute.queryParams.subscribe((params) => {
            this.search_active_directory = params["search_active_directory"];
            if(this.search_active_directory !== null) {
                this.user_flag = false;
            }
            else {
                this.user_flag = true;
            } 
        });

        // getting the name of the user whose profile has been shown
        this._userProfileService.userHeaderName.subscribe((username: any) => {
            this.user_first_name = username.first_name;
            this.user_last_name = username.last_name;
            this.user_flag = true;
        });
        
        // getting the header of the search or any functionality
        this._searchService.headerName.subscribe((headerString: string) => {
            this.workspace = headerString;
            this.workspace_flag = true;
        });

        // fetching the first name and last name of the logged in user from the token
        this._authService.fetchUserAfterLogin().subscribe((data: any) => {
            this.first_name = <string>data.first_name;
            this.last_name = <string>data.last_name;
        });
    }

    // on destroy hook will be invoked when component gets destroyed
    ngOnDestroy() {
        
    }
}