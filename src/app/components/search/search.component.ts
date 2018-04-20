import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {OrderPipe} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';


import * as _ from "lodash";
import {Subject} from "rxjs/Subject";
import {searchQuery} from "../../models/searchQuery.interface";
import {NgForm} from "@angular/forms";

import {AddUserService} from "../../services/add-user.service";
import {SearchService} from "../../services/search.service";

import {ROLES_DATA} from "../../models/roles.data";
import {MODULES_DATA} from "../../models/modules.data";
import {resetFakeAsyncZone} from "@angular/core/testing";
import {PermissionService} from "../../services/permission.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})

// Search Component typescript file
export class SearchComponent implements OnInit {

  permission;
  // form or search properties
  first_name: string;
  last_name: string;
  employee_id: string;
  search_active_directory: any;
  role: string;
  show_active_directory_filed: string;
  searchForm: NgForm;
  roles_data: Array<any> = ROLES_DATA;
  modules_data: Array<any> = MODULES_DATA;
  combination_module_role: Array<any> = [];
  buttonText: string;
  searchFlag: boolean;
  dirtyFlag: boolean;
  module: any;
  query: searchQuery;
  roles: Array<any>;
  role_option: any;
  page_function: string;
  toast_flag: boolean;
  search_active_error_flag: boolean = false;
  key_down_flag: boolean;

  // now hard coded but will be fetched dynamically when we add other modules
  module_id: number = 2;
  module_name: string = "AMAZE_MOBILE";
  module_description: string = "Mobile";


  // modal related properties
  modal_first_name: string;
  modal_last_name: string;
  modal_user_name: string;
  authorities: Array<any> = [];

  // table and pagination related properties
  showTable: boolean;
  order: string = 'first_name';
  users: any[];
  sortedUsers: any[];
  itemsPerPage: number = 8;
  p: number = 1;
  reverse: boolean = false;
  dataArrayLength: number;
  totalLength: number;

  constructor(
    private _searchService: SearchService,
    private _orderPipe: OrderPipe,
    private _ngxPaginationModule: NgxPaginationModule,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _addUserService: AddUserService,
    private _permission: PermissionService
  ) {}


  ngOnInit() {
    this.GetPermission();
    this.buttonText = "Search";
    this.sortedUsers = this._orderPipe.transform(this.users, 'first_name');
    this.searchFlag = true;
    this.showTable = false;
    this.dataArrayLength = 0;
    this.dirtyFlag = false;

    // pushing the data to the header
    this.page_function = "Search User";
    this._searchService.headerName.next(this.page_function);

    this._activatedRoute.queryParams.subscribe((params) => {
      this.search_active_directory = params.search_active_directory;
      this.users = [];
      this.showTable = false;
      this.searchFlag = true;
      this.dirtyFlag = false;
    });
    this.module = {};
    this.toast_flag = false;

    _.forEach(this.modules_data, (amaze_module) => {
      _.forEach(this.roles_data, (role) => {
        let mapping = {};
        const value = this.getRole(role.name);
        mapping["roles"] = value;
        mapping["id"] = amaze_module.id;
        this.combination_module_role.push({
          "value": amaze_module.name + " " + role.name,
          "mapping": mapping
        });
      });
    });

  }


  GetPermission() {
    // fetching the roles of user and Saving a value to a global variable
    this.permission = this._permission.getPermissions();  //calling getPermissions method of permission.service.ts web service
    console.log(this.permission);
  }

  givepermissions(module) {
    //Checking User module access values
    if (this.permission) {

      //Checking every Permisson and providing access to that Module
      for (let i = 0; i < this.permission.length; i++) {

        console.log("premission Row :- " + this.permission[i]);
        if (module == this.permission[i]) {
          console.log("Permission:-  " + module);
          //If user have access then dont disabled the radio input
          return false
        }

      }
      //If user don't have access then disabled the radio input
      return true
    }
    else {
      //If user don't have access then disabled the radio input
      return true;

    }
  }

  // disabling on the key down event
  onkeydown(event) {
    this.key_down_flag = true;
  }

  // on the click of the button
  onSubmit(form: NgForm) {
    this.searchForm = form;
    this.buttonText = "Searching...";
    this.searchFlag = false;
    this.showTable = true;
    this.dirtyFlag = true;
    this.show_active_directory_filed = this.first_name ? this.first_name : (this.last_name ? this.last_name : (this.employee_id ? this.employee_id : ""));
    // console.log("the value of the show active directory filed  is: "+ JSON.stringify(this.show_active_directory_filed));
    // console.log("the value of the role option value is: " + JSON.stringify(this.role_option));
    if (this.role_option) {
      this.query = {
        "first_name": this.first_name || "",
        "last_name": this.last_name || "",
        "username": this.employee_id || "",
        "search_active_directory": this.search_active_directory,
        "module": this.role_option
      };
    }
    else {
      this.query = {
        "first_name": this.first_name || "",
        "last_name": this.last_name || "",
        "username": this.employee_id || "",
        "search_active_directory": this.search_active_directory
      }
    }
    // calling the method in the search service with the query body
    this._searchService.searchOnAmazeDatabase(this.query).subscribe(
      (resultArray: Array<any>) => {
        if (resultArray.length === 0) {
          this.users = [];
          this.showTable = false;
          this.searchFlag = true;
          this.dirtyFlag = true;
          this.dataArrayLength = 0;
          this.buttonText = "Search";
          if (this.search_active_directory) {
            this.search_active_error_flag = true;
          }
        }
        else {
          this.parseResultDataArray(resultArray).then((dataArray) => {
            this.users = dataArray;
            this.searchFlag = true;
            this.dirtyFlag = false;
            this.buttonText = "Search";
            if (this.users.length < 8) {
              this.dataArrayLength = this.users.length;
              this.totalLength = this.users.length;
              if (this.dataArrayLength === 0) {
                this.showTable = false;
              }
            }
            else {
              this.dataArrayLength = 8;
              this.totalLength = this.users.length;
            }
          });
        }
      }, (err) => {
        console.log("Inside the error on the amaze database");
        this._router.navigate(['/', 'user_management', 'search_user'], {queryParams: {"search_active_directory": false}});
      });
  }


  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  parseResultDataArray(resultArray): Promise<any> {
    return new Promise((resolve, reject) => {
      let dataArray = [];
      _.forEach(resultArray, (user) => {
        let mappedArray = [];
        _.forEach(user.authorities, (authority: any) => {
          let mapping = {};
          mapping["module_name"] = authority.name;
          mapping["roles"] = _.map(authority.roles, (role: any) => {
            return role.name;
          });
          mappedArray.push(mapping);
        });

        dataArray.push({
          "first_name": user.first_name,
          "last_name": user.last_name,
          "employee_id": user.username,
          "mappedArray": mappedArray
        });
      });
      resolve(dataArray);
    });
  }

  onSearchActiveDirectory() {
    this._searchService.searchOnActiveDirectory(this.first_name).subscribe((dataArray) => {
      if (dataArray.length == 0) {
        this.users = [];
        this.showTable = false;
        this.searchFlag = true;
        this.dirtyFlag = true;
        this.dataArrayLength = 0;
        this.buttonText = "Search";
        this.search_active_error_flag = true;
      }
      else {
        this.users = dataArray;
        this.searchFlag = true;
        this.showTable = true;
        this.dirtyFlag = false;
        this.buttonText = "Search";
        if (this.users.length === 0) {
          this.showTable = false;
        }
        if (this.users.length < 8) {

          this.dataArrayLength = this.users.length;
          this.totalLength = this.users.length;
          if (this.dataArrayLength === 0) {
            this.showTable = false;
          }
        }
        else {

          this.dataArrayLength = 8;
          this.totalLength = this.users.length;
        }
      }
    });
    // }, (err) => {
    //     console.log("the Inside the error of the search active directory");
    //     // this._router.navigate(['/', 'user_management', 'search_user'], { queryParams: {"search_active_directory": false }});
    // });
  }

  // hook will be triggered when page will change
  pageChanged($event) {
    if ($event === 1) {
      if (this.users.length > this.itemsPerPage) {
        this.dataArrayLength = this.itemsPerPage;
        this.totalLength = this.users.length;
      }
      else {
        this.dataArrayLength = this.users.length;
        this.totalLength = this.users.length;
      }
    }
    else {
      // this is the last page
      if ((this.itemsPerPage * $event) > this.users.length) {
        this.dataArrayLength = this.users.length - (this.itemsPerPage * ($event - 1));
        this.totalLength = this.users.length;
      }
      else {
        this.dataArrayLength = this.itemsPerPage;
        this.totalLength = this.users.length;
      }
    }
  }

  // getting the roles 
  getRole(role_option: any) {
    let roles = [];

    _.forEach(this.roles_data, (role) => {
      if (role_option.toUpperCase() === role.name) {
        roles.push(role);
      }
    });

    return roles;
  }

  // when the modal gets clicked
  onModalButtonClick(modal_first_name, modal_last_name, modal_user_name) {
    console.log("the values of the first name, last_name and username is: " + modal_first_name + modal_last_name + modal_user_name);
    this.modal_first_name = modal_first_name;
    this.modal_last_name = modal_last_name;
    this.modal_user_name = modal_user_name;
    // looping through the module list to add no access in the authorities
    _.forEach(this.modules_data, (module) => {
      // not adding anything for coding review and bond in the authorities 
      if (module.id == 2 || module.id == 3) {
        // add the module to authorities
        module["roles"] = [];
        module["roles"].push(this.roles_data[0]);
        this.authorities.push(module);
      }
    });
  }

  // when user changes the selection in the radio buttons
  onSelectionChange(role, module) {
    // changing the roles when the user selects different roles
    _.forEach(this.authorities, (authority) => {
      if (authority.id == module.id) {
        authority["roles"] = [];
        authority["roles"].push(role);
      }
    });

  }

  // when the modal gets submitted
  onModalAddSubmit() {
    const query = this.createAddQuery();
    this._addUserService.addUserToAmazeDatabase(query).subscribe((data) => {
      if (data) {
        // setting the toast_flag
        this.toast_flag = true;

        // remove the toast after the 3 second
        setTimeout(() => {
          this.toast_flag = false;

          // navigate to the search Componen
          this._router.navigate(["/", "user_management", "search_user"], {
            relativeTo: this._activatedRoute,
            queryParams: {'search_active_directory': false}
          });
        }, 3000);
      }
      else {
        console.log("the result came as false" + JSON.stringify(data));
      }
    }, (err) => {
      console.log("Inside the error of the add user" + JSON.stringify(err));
    });
  }


  // create the add query for the adding the new user into the amaze database
  createAddQuery() {
    const addQuery = {
      "username": this.modal_user_name,
      "first_name": this.modal_first_name,
      "last_name": this.modal_last_name,
      "authorities": this.authorities
    };

    return addQuery;
  }

  onRowClick(employee_id) {
    this._searchService.searchOnAmazeDatabase({
      "username": employee_id,
      "search_active_directory": false
    }).subscribe((data) => {
      this._searchService.userInfo.next(data);
      this._router.navigate(["user-profile"], {relativeTo: this._activatedRoute})
    });
  }

  onToastCloseClick() {
    this.toast_flag = false;
  }
}