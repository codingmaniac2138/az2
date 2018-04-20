import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UserProfileService } from "../../services/user-profile.service";
import { SearchService } from "../../services/search.service";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { MODULES_DATA } from "../../models/modules.data";
import { ROLES_DATA } from "../../models/roles.data";
import * as _ from "lodash"; 
import { PermissionService } from "../../services/permission.service";

@Component({
    selector: "app-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.scss"]
})

export class UserProfile implements OnInit  {
    
    permission;
    first_name: string;
    user_id: number;
    last_name: string;
    employee_id: string;
    authorities: Array<any>;
    modules_data: any = MODULES_DATA;
    roles_data: any = ROLES_DATA;
    parsed_module_roles: Promise<any>;
    putQuery: Array<any> = [];
    objectKeys = Object.keys;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _userProfileService: UserProfileService,
        private _searchService: SearchService, 
        private _router: Router,
         private _permission: PermissionService
    ) {}

    ngOnInit() {
        
            this.GetPermission();
            this._searchService.userInfo.subscribe((user_data: any) => {
            // fetching only 0th element because we searched on the userid
            this.first_name = user_data[0].first_name;
            this.last_name = user_data[0].last_name;
            this.employee_id = user_data[0].username;
            this.user_id = user_data[0].user_id;
            this.authorities = user_data[0].authorities;
            this.parsed_module_roles =  this.parseModuleAndRoles();
            this._userProfileService.userHeaderName.next({"first_name": this.first_name, "last_name": this.last_name });
        });

        this._activatedRoute.params.subscribe((params) => {
            const workspace = params["workspace"].replace("_", " ");
            this._searchService.headerName.next(workspace);
        });

    }

  GetPermission() 
    { 
                // fetching the roles of user and Saving a value to a global variable
                this.permission = this._permission.getPermissions();  //calling getPermissions method of permission.service.ts web service
                console.log(this.permission);
         }

         givepermissions(module){
            //Checking User module access values
             if(this.permission){
     
                 //Checking every Permisson and providing access to that Module
                 for(let i=0; i< this.permission.length; i++){
     
                    console.log("premission Row :- " + this.permission[i]) ;
                    if(module == this.permission[i]){
                     console.log("Permission:-  " + module) ;
                        //If user have access then dont disabled the radio input
                        return false
                    }
     
                 }
                //If user don't have access then disabled the radio input
                 return true
             }
             else{
                //If user don't have access then disabled the radio input
                 return true;
                  
             }
         }
  
    parseModuleAndRoles() : Promise<any> {
        return new Promise((resolve, reject) => {
            const moduleRoleMap = {};
            _.forEach(this.authorities, (amaze_module) => {
                // console.log("the value of the amaze_module"+ JSON.stringify(amaze_module));
                moduleRoleMap[amaze_module.name] = {};
                amaze_module.roles.forEach(role => {
                    moduleRoleMap[amaze_module.name][role.name] = role.id;
                });
                // console.log("the value of the moduleRoleMap is: "+ JSON.stringify(moduleRoleMap));
                resolve(moduleRoleMap);
            });
        });
    }

    onSelectionChange(role, module) {
        // console.log("the value of the role is: "+ JSON.stringify(role));
        // console.log("the value of the module is: "+ JSON.stringify(module));
        // check whether the object of module and roles has already been pushed or not
        const isModulePresent: boolean = this.putQuery.some((obj) => {
            return obj["id"] == module.id; 
        });

        // if it been pushed then do not do anything otherwise push the object
        if(isModulePresent) {
            let roles: Array<any> = this.putQuery.find((obj) => {
                if(obj["id"] == module.id) {
                    return obj["id"].roles;
                }
            });

            const isRolePresent: boolean = roles.some((roleObj) => {
                return roleObj["id"] = role.id;
            });

            if(isRolePresent) {
                // do nothing if role is present
            }
            else {
                this.putQuery.forEach((amaze_module) => {
                    if(amaze_module.id == module.id) {
                        amaze_module.roles.push({
                            "id": role.id
                        });
                    }
                });
            }
        }
        else {
            this.putQuery.push({
                "id": module.id,
                "roles": [
                    {
                        "id": role.id
                    }
                ]
            });
        }
    }

    customHasOwnProperty(obj: object, key: string) {
        if(obj) {
            return obj.hasOwnProperty(key);
        }
        else {
            return false;
        }
        
    }

    onPutSubmit() {
        // make a put request to the backend
        this._userProfileService.putRoleForUser(this.putQuery, this.user_id).subscribe((res) => {
            // route to the search user page
            this._router.navigate(["/", "user_management", "search_user"], { relativeTo: this._activatedRoute, queryParams: { "search_active_directory": false } });
        });
    }

    getRoleId(obj: object, moduleName: string, roleName: string) {
        if(obj) {
            if(obj[moduleName].hasOwnProperty(roleName)) {
                return true;
            }
            else {
                false;
            }
        }
        else {
            return false;
        } 
    }
    onCancelClick() {
        this._router.navigate(["/", "user_management", "search_user"], { relativeTo: this._activatedRoute, queryParams: { "search_active_directory": false } });
    }
}