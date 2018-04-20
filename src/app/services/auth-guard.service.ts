import { Injectable } from "@angular/core";
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthorizationService } from "./authorization.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    // injecting the authorization service for finding whether user has logged in or not
    constructor(
        private _authService: AuthorizationService,
        private _router: Router
    ) {}

    // canActivate method to check whether user has logged in or not
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        const authenticated: boolean =  this._authService.isLoggedIn();
        if(authenticated) {
            return true;
        }
        else {
            this._router.navigate(["/login"]);
        }
    }
}