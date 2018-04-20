/**
 * Model class for the User it containes the user_id, name and array of Module 
 */

// import { Module } from "./module.model";
import { Module } from "./module.interface";
import { ROLES } from "./roles.enum";
export class User {
    
    user_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    employeeID: string;
    display_name: string;
    authorities: Array<Module>;

    // construct the user object
    // constructor(user_id, first_name = "", last_name = "", employeeID = "", display_name = "", authorities = []) {
    //     this.user_id = user_id;
    //     this.first_name = first_name;
    //     this.last_name = last_name;
    //     this.employeeID = employeeID;
    //     this.display_name = display_name;
        
    //     // parse array and make a module array
    // }

    // give the roles given to the user
    public getRoles(): Array<ROLES> {
        return null;
    }

}