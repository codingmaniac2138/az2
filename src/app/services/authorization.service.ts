/**
 * Authorization service that will be able to handle
 * 1. Login to handle POST request, parse the payload and storing into the localStorage
 * 2. Logout functionality
 * 3. Refresh Token functionality
*/

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { ROLES } from "../models/roles.enum";
import { MODULES } from "../models/modules.enum";
import { User } from "../models/user.model";
import { ERRORS } from "../models/error.enum";

import { CONFIG } from "../../config";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

import { JwtHelper } from "angular2-jwt";
import * as _ from "lodash";
import * as moment from "moment";

@Injectable()
export class AuthorizationService {

    private loginURL: string = `${CONFIG.url_prefix}/amaze/api/v1.0/auth/login/`;
    private fetchUserURL: string = `${CONFIG.url_prefix}/amaze/api/v1.0/user/`;

    // whether user has logged in or not
    loggedIn: boolean = false;

    constructor(private _httpService: HttpClient) { }

    // handling the login of user and we will allow only the admin
    public login(careMoreID: string, password: string) {
        // body with the post request
        const body = {
            "username": careMoreID,
            "password": password
        };

        // if local storage contains the access_token before the login request it must be deleted
        // it must be deleted on the logout but for now we are deleting the access_token in the 
        // local storage
        if (localStorage.getItem("access_token")) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("exp_access_time");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("exp_refresh_token");
        }
        return this._httpService.post(this.loginURL, body).do((res) => this.handleSession(res));
    }

    // function for the logout
    public logout() {

    }

    // handle the session information like handling the session info
    private handleSession(res) {
        if (!res) {
            // if the value of the token did not came and the user is not the admin
            // console.log("the value of token did not came");
            throw Observable.throw({
                "error": ERRORS.USERNAME_NOT_CORRECT
            });
        }
        else {
            // parsing the data token and storing it into the local storage
            const jwtHelper = new JwtHelper();
            const localPayload = jwtHelper.decodeToken(res.access_token);
            // console.log("payload inside else:" + localPayload);
            const expirationTime = localPayload.exp * 1000;
            // console.log("the value of the expiration time is " + moment(expirationTime).format("LLLL"));
            const issuedTime = localPayload.iat * 1000;
            // console.log("the value of the issuence time is: " + moment(issuedTime).format("LLLL"));
            // console.dir(this.payload);
            if (this.parsePayload(localPayload)) {
                // console.log("populating the local storage for the first time");
                // code to populate the access token and refresh token in the local storage
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("exp_access_time", expirationTime.toString());
                localStorage.setItem("refresh_token", res.refresh_token);
                localStorage.setItem("exp_refresh_token", moment(expirationTime).add(45, "days").valueOf().toString());
            }
            else {
                // the user does not have admin access
                return Observable.throw({
                    "error": ERRORS.NOT_AUTHORIZED
                });
            }
        }

    }

    // function to parse the payload for now I am providing logic of getting the ADMIN access to the 
    // USER_MANAGEMENT module. have to make this logic more sound
    private parsePayload(payload) {
        let roles = [];
        _.some(payload.user.authorities, (amaze_module) => {
            switch (amaze_module.module.name) {
                case MODULES.USER_MANAGEMENT:
                    roles = _.filter(amaze_module.module.roles, (role) => {
                        return role.name === ROLES.ADMIN;
                    });
                case MODULES.AMAZE_MOBILE:
                roles = _.filter(amaze_module.module.roles, (role) => {
                    return role.name === ROLES.ADMIN , true;
                    
                });
                case MODULES.AMAZE_TOUCH:
                roles = _.filter(amaze_module.module.roles, (role) => {
                    return role.name === ROLES.ADMIN , true;
                });
                case MODULES.CODING_REVIEW:
                roles = _.filter(amaze_module.module.roles, (role) => {
                    return role.name === ROLES.ADMIN , true;
                });
                case MODULES.BOND:
                roles = _.filter(amaze_module.module.roles, (role) => {
                    return role.name === ROLES.ADMIN , true;
                });
                default:
                    return [];
            }
        });
        if (roles[0].name === ROLES.ADMIN) {
            return true;
        }
        else {
            return false;
        }
    }

    // function to check whether the user is logged in or not
    public isLoggedIn() {
        return this.loggedIn;
    }

    // function to handle and get a new access token from refresh token
    private getNewAccessToken() {

    }

    // fetching user after user has logged in and get the data of first name and last name
    fetchUserAfterLogin():Observable<any> {
        return this._httpService.get(this.fetchUserURL).map((data: any) => {
            return { "first_name": data.first_name, "last_name": data.last_name };
        });
    }
}