import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Districts, States, SessionsData, AvailableSession } from './models';
import { CowinService } from './Services/cowin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue:'en-in' }
  ]
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'address', 'pincode', 'available_capacity'];
  dataSource:AvailableSession[]=[]; 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  title = 'VaccineInfoApp';
  States: States={};
  Districts: Districts={};
  SessionsData: SessionsData={sessions:[]};
  value:any;
  dateValue:any;

  constructor(private cowinService: CowinService) {
   

  }


  ngOnInit(): void {
    
    this.cowinService.getStates().subscribe(
      
      {
        next:(result:States) => {
          debugger;
          this.States = result; 
          console.log(result);
        },
        error:(result:any)=> console.log(result)
      })
  }

  stateChange(event: MatSelectChange){
debugger;
console.log(event);

this.cowinService.getDistricts(event.value).subscribe(
      
      {
        next:(result:Districts) => {
          debugger;
          this.Districts = result; 
          console.log(result);
        },
        error:(result:any)=> console.log(result)
      });
  }

  findByDistrict(){

    console.log(this.dateValue);
    var date = "07-05-2021";
    this.cowinService.findByDistrict(1,date).subscribe(
      {
        next:(result:SessionsData) => {
          debugger;
          this.dataSource = result.sessions; 
          console.log(result);
        },
        error:(result:any)=> console.log(result)
      });


  }
}
