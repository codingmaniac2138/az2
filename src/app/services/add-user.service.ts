import { Injectable } from "@angular/core";

import { CONFIG } from "../../config";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable"; 

@Injectable()
export class AddUserService {
    private addUserURL: string = `${CONFIG.url_prefix}/amaze/api/v1.0/user_management/add_user`;

    constructor(private _httpClient: HttpClient) {}

    // adding user in the amaze database
    addUserToAmazeDatabase(body): Observable<boolean>{
        
        return this._httpClient.post(this.addUserURL, body).map((res) => {
            console.log("the data is: "+ JSON.stringify(res));
            if(!res) {
                return false;
            }
            else {
                return true;
            }
        });
    }

}