import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crtable',
  templateUrl: './crtable.component.html',
  styleUrls: ['./crtable.component.scss']
})
export class CrtableComponent implements OnInit {

  @Input() character: any;
  @Input() columns: string[];
  id: number;
  data_set: any;
  value: any;
  private sub: any;
  // @ViewChild(MatSort) sort: MatSort;
  
  // data source from which we have to get the data 
  dataSource: any;

  // columns to be displayed on the table
  displayedColumns = ["first_name", "last_name", "employee_id", "role"];
  
  constructor() {

  }

  ngOnInit() {

    
    // ---------------------------------------------------------------------------------------------
this.data_set =[{ "First Name": "John","Last Name":"Doe", "Discharge Date": "11/10/2017", "Status": "New" },
{ "First Name": "Tom","Last Name":"Smith", "Discharge Date": "08/12/2017", "Status": "New" },
{ "First Name": "Jeff","Last Name":"Jhone", "Discharge Date": "12/10/2017", "Status": "In Progress" },
{ "First Name": "Jane","Last Name":"Robert", "Discharge Date": "11/11/2017", "Status": "In Progress" },
{ "First Name": "Ross","Last Name":"Mark", "Discharge Date": "01/10/2018", "Status": "New" }
    
    ]

    this.columns = ["Status","First Name", "Last Name", "Discharge Date"]

    var value_list =[]
 
      this.character = this.data_set
      console.log(this.character)
      
      // document.getElementsByTagName('td').inn;
   
  }

  // Handling the on click event on the row
  onRowClicked(row) {
    console.log("the row is: "+ JSON.stringify(row));
    
  }
  myFunction() {
    var input, filter, table, tr, td,td1,td2,td3, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tb");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];
      td3 = tr[i].getElementsByTagName("td")[3];

      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        }           
        else if(td1.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
         }
         else if(td2.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
         }
         else if(td3.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
         }
          else {
          tr[i].style.display = "none";
        }
      } 
      
    }
  }
  
}




// // list of rows which should be displayed
// public rows: Array<any> = [];
  
// // the columns which contain the config part like title of the columns and sort action true or false.
// public columns: Array<any> = [
//   {title: "FirstName", name: "first_name"},
//   {title: "LastName", name: "last_name", sort: false},
//   {title: "EmployeeID", name: "employee_id", sort: false},
//   {title: "Role", name: "role", sort: false}
// ];

// // the default page after the component page loading
// public page: number = 1;

// // number of items available on the page
// public itemsPerPage: number = 10;

// // number in the pagination list after which ... will appear
// public maxSize: number = 4;

// // the number of pages that are there in the view right now only 1 for testing
// public numPages: number = 1;

// // the total number of items after filtering (not required by current version may be in the next version).
// public length: number = 0;

// // the config object that defines the configuration about the table sorting, filtering and pagination
// public config = {
//   paging: true,
//   sorting: { columns: this.columns },
// };

// // the data source that we add show on the table after querying the backend REST service.Right now testing with dummy data
// public dataSource: Array<any> = DummyData;

// // 
// constructor() {
//   this.length = this.dataSource.length;
// }

// ngOnInit() {
// }

// public onChangeTable(config:any) {
//   // const page: any = {page: this.page, itemsPerPage: this.itemsPerPage};
  
//   // if (config.sorting) {
//   //   Object.assign(this.config.sorting, config.sorting);
//   // }
//   console.log("Inside the onTableChange function");

// }
