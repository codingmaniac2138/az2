import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { ERRORS } from "../models/error.enum";
import { Observable } from "rxjs/Observable";

import * as _ from "lodash";

@Injectable()
export class PermissionService {

  constructor() { }
  
  public getPermissions()
  
   { 
  var userPermission =[];
  //fetching the access token from localStorage
  var user_token = localStorage['access_token'];

  console.log(user_token);
  //If there is no token throw error
  if (!user_token) 
{
      // if the value of the token did not came and the user is not the admin
      // console.log("the value of token did not came");
      throw Observable.throw({
          "error": ERRORS.USERNAME_NOT_CORRECT
      });
  }
  // parsing the data token and storing it into the local storage
  const jwtHelper = new JwtHelper();
    
  const localPayload = jwtHelper.decodeToken(user_token);
  //fetching the user
  let data = _.forEach(localPayload.user);
    

  //Checking All Modules of user using For loop
  for(var i=0; i < data.authorities.length; i++)
{ 
    // console.log(data.authorities[i].module.id);
    // console.log(data.authorities[i].module.roles[0].id);
   
    //Checking the Admin Role
    if(data.authorities[i].module.id == "1" && data.authorities[i].module.roles[0].id == "5")
    { 
            //userPermission.push(0); //setting permission to the user for this module
            // userPermission.push(1);
            // userPermission.push(2);
            // userPermission.push(3);
            // userPermission.push(4);
            // userPermission.push(5);
            // console.log("userPermission :- "+ userPermission);
        }

    if(data.authorities[i].module.id == "2" && data.authorities[i].module.roles[0].id == "5")
{ 
        userPermission.push(0); //setting permission to the user for this module
    
        // console.log("userPermission :- "+ userPermission);
    }
   
    //Checking the Admin Role
    if(data.authorities[i].module.id == "3" && data.authorities[i].module.roles[0].id == "5")
{
        userPermission.push(1); //setting permission to the user for this module

        // console.log("userPermission :- "+ userPermission);
    }

    //Checking the Admin Role    
    if(data.authorities[i].module.id == "4" && data.authorities[i].module.roles[0].id == "5")
{ 
        userPermission.push(2); //setting permission to the user for this module

        // console.log("userPermission :- "+ userPermission); 
    }

    //Checking the Admin Role
    if(data.authorities[i].module.id == "5" && data.authorities[i].module.roles[0].id == "5")
{ 
        userPermission.push(3); //setting permission to the user for this module

      // console.log("userPermission :- "+ userPermission); 
    }
     }
return userPermission; // Giving module access values
  }

}
