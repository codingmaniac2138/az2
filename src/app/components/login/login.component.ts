import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { ERRORS } from "../../models/error.enum";

import { AuthorizationService } from "../../services/authorization.service";
import { CookieService } from "ngx-cookie";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent {

  caremoreID: string;
  password: string;
  checkbox: boolean;
  spinnerFlag: boolean;
  errorBlockFlag: boolean;
  buttonText: string;
  buttonColorFlag: boolean;

  // Injecting the service of Authorization, Encrypting, Router and Cookie Service
  constructor(
    private _authService: AuthorizationService,
    private router: Router,
    private _cookieService: CookieService) {}

  ngOnInit() {
    this.spinnerFlag = false;
    this.errorBlockFlag = false;
    this.checkbox = false;
    this.buttonText = "Sign In";
    this.buttonColorFlag = false;
    this.checkCookieStore();
  }

  // onSubmit function
  onSubmit(loginForm: NgForm) {
    this.spinnerFlag = true;
    this.buttonText = "Signing In....";
    this.buttonColorFlag = true;
    this.handleRememberMe();
    this._authService.login(this.caremoreID, this.password).subscribe(
      () => {
        console.log("Inside the sucess of authservice function");
        console.log("user has logged in succesfully");
        this.router.navigate(['/', "user_management", "search_user"], { queryParams: {"search_active_directory": false}});
      },
      (err) => {
        console.log("Inside the error of the authservice"+ JSON.stringify(err));
        this.errorBlockFlag = true;
        this.spinnerFlag = false;
        this.buttonText = "Sign In";
        this.buttonColorFlag = false;
      }
    );
  }


  //handle the remember me with the cookie service
  handleRememberMe() {
    if (this.checkbox) {
      if (this._cookieService.get("username")) {
        // if the user has changed the 
        if(this.caremoreID !== this._cookieService.get("username")) {
          this._cookieService.put("username", this.caremoreID);
        }
      }
      else {
        // putting in the cookie store
        this._cookieService.put("username", this.caremoreID);
      }
    }
  }

  // reset the values after the error block is closed
  closeErrorBlock() {
    this.errorBlockFlag = false;
    this.spinnerFlag = false;
    this.buttonText = "Sign In";
    this.buttonColorFlag = false;
  }

  // Checking whether username and password are present in the store
  checkCookieStore() {
    if(this._cookieService.get("username")) {
      this.caremoreID = this._cookieService.get("username");
      this.checkbox = true;
    }
    else {
      this.caremoreID = "";
      this.password = "";
      this.checkbox = false;
    }
  }

}