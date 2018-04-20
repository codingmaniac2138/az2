import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { SearchService } from "../services/search.service";

import { CONFIG } from "../../config";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";

@Injectable()
export class UserProfileService {
    private getRolesURL = "";
    private putRolesURL = `${CONFIG.url_prefix}/amaze/api/v1.0/user_management/user_roles/`;
    userHeaderName = new Subject();
    
    constructor(
        private _searchService: SearchService,
        private _httpService: HttpClient
    ) {}

    // function get the roles from the backend
    getRoleForUser(username: string) {
        const body = {
            "username": username,
            "search_active_directory": false
        };
        
        this._searchService.searchOnAmazeDatabase(body).map((res) => {
            console.log("the data is : "+ JSON.stringify(res));
        });
    }

    // function to post the updated data on the backend
    putRoleForUser(body: any, user_id: number) {
        const searchPutURL = (this.putRolesURL + user_id).toString();
        return this._httpService.put(searchPutURL, body).map((res) => {
            console.log("the responce of put is:"+ JSON.stringify(res));
            return res;
        });
        // console.log("the value of search put url is: "+ searchPutURL);
    }

}