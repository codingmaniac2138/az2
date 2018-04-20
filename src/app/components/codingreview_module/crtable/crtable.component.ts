import { Component, OnInit, Input } from '@angular/core';
import { exists } from 'fs';

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
       // function to make search on the basis of checkboxes
read_checks(){

var c=document.getElementById('new');
  var d=document.getElementById('progress');
  if (c.checked) {
    // alert("new");
     return this.checkbox_filter("New")
    ;
  } 
  else {
    // alert("ooooooooooooo");
    if(d.checked){ 
      // alert("progress");  
      return this.checkbox_filter("In Progress");
    }
    else {
      // alert("unchecked");
      
        return this.checkbox_filter("");
  }
}
}
  // function which searches on the whole table
  myFunction() {
    // -----------------------------------------------------------------------------
 
    // -------------------------------------------------------------------------------------
    var input, filter, table, tr, td,td1,td2,td3, i;
    input = document.getElementById("myInput");


    filter = input.value.toUpperCase();
    if( filter != "" ){

    table = document.getElementById("tb");
    tr = table.getElementsByTagName("tr");
    // alert(tr.length);

    for (i = 0; i < tr.length; i++) {
      if (tr[i].style.display != "none"){
      td = tr[i].getElementsByTagName("td")[1];
      td1 = tr[i].getElementsByTagName("td")[2];
      td2 = tr[i].getElementsByTagName("td")[3];
      td3 = tr[i].getElementsByTagName("td")[0];

      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    // alert("inside innerhtml");

          tr[i].style.display = "";
        }           
        else if(td1.innerHTML.toUpperCase().indexOf(filter) > -1) {
          // alert("inside innerhtml");

          tr[i].style.display = "";
         }
         else if(td2.innerHTML.toUpperCase().indexOf(filter) > -1) {
          // alert("inside innerhtml");
          tr[i].style.display = "";
         }
         else if(td3.innerHTML.toUpperCase().indexOf(filter) > -1) {

          tr[i].style.display = "";
         }
          else {
            // alert("keeeeeeeeeeeeeeeppppppppppp newwwwwwwwwwwww")
            // this.read_checks()
          tr[i].style.display = "none";
          
        }

      } 
    }
    }
  }
  else {
    // alert("search is empty");
    this.read_checks()
  }
  }
  // function to filter as per check boxes
  checkbox_filter(check_value) {
    // alert(check_value);
    var input, filter, table, tr, td,td1,td2,td3, i;
    input = document.getElementById("myInput");
    filter = check_value.toUpperCase();
    table = document.getElementById("tb");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
     
      
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";

         }
          else {
          tr[i].style.display = "none";
        }
      } 
      
    }
  }
}
