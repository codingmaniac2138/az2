import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DummyData } from "./dummy.data";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})

// Table Component test that would populate the data, sort the first_name only and apply pagination too.
export class TableComponent implements OnInit {
  
  
  order: string = 'first_name';
  reverse:boolean = false;
  // data to be shown
  users:any[] = [
  {first_name: "abc", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "def", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "ghi", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "jkl", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "mno", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "pqr", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "stu", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "vwx", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "yza", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "bcd", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "efg", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "hij", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "klm", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "nop", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "qrs", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "tuv", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "wxy", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "zab", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "cde", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "fgh", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "ijk", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "lmn", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "opq", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},
  {first_name: "rst", last_name: "def", employee_id: "jsdfg", role: "amaze_user"},

  ];
  sortedUsers: any[];
  p: number = 1;
  
  constructor(private _orderPipe: OrderPipe, private _ngxPaginationModule:NgxPaginationModule) {
    this.sortedUsers = _orderPipe.transform(this.users, 'first_name');
  }

  ngOnInit() {
  
  }

  //function to sort the column
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  populateArray($event) {
    console.log("the value of data array event is: "+ JSON.stringify($event));
  }
  
}