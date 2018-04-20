import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { User } from "../models/user.model";
import { MODULES } from "../models/modules.enum";

import { CONFIG } from "../../config";

import "rxjs/add/operator/map";

import * as _ from "lodash";
import { ROLES } from '../models/roles.enum';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
   
@Injectable() 
export class SearchService {
    
    users: Array<User>;
    
    // the headerName BehaviorSubject Search User that is to be displayed at 
    // header when search component loades it into the header 
    headerName = new BehaviorSubject("");
    userInfo = new BehaviorSubject([]);

    private searchURL = `${CONFIG.url_prefix}/amaze/api/v1.0/user_management/search_user`;

    constructor(private _httpService: HttpClient) {}

    // function to search in the amaze database
    searchOnAmazeDatabase(body: any): Observable<any[]> {
        let responceArray: Array<any> = [];
        
        // getting the information from the responce object and putting it into the responce array
        return this._httpService.post(this.searchURL, body).map((res) => {
            return <Array<any>> res;
        });  
    }

    // function to search in the active directory
    searchOnActiveDirectory(first_name: string): Observable<any> {
        let responceArray: Array<any> = [];
        console.log("the first_name is: "+ first_name);
        const body = {
            "first_name": first_name,
            "search_active_directory": true
        };

        return this._httpService.post(this.searchURL, body).map((res: any) => {
            _.forEach(res, (resObject) => {
                responceArray.push({
                    "first_name": resObject.first_name,
                    "last_name": resObject.last_name,
                    "employee_id": resObject.username
                });
            });
            console.log("the value of responce array is: "+ JSON.stringify(responceArray));
            return responceArray;
        });
    }
    
    findAdminOrUser(user): Promise<any> {
        return new Promise((resolve ,reject) => {
            _.forEach(user.authorities, (amaze_modules) => {
                switch(amaze_modules.name) {
                    case MODULES.USER_MANAGEMENT:
                        _.filter(amaze_modules.roles, (role) => {
                            if(role.name === ROLES.ADMIN) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                        break;
                    default:
                        resolve(true);
                        break;
                }
            });
        });
    }
    
}