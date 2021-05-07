import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Districts, States, SessionsData, AvailableSession } from './models';
import { CowinService } from './Services/cowin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address', 'pincode', 'available_capacity'];
  dataSource: AvailableSession[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  title = 'VaccineInfoApp';
  States: States = {};
  Districts: Districts = {};
  selectedDistrict: number = 0;
  value: number = 0;
  pincode: string = '';
  SessionsData: SessionsData = { sessions: [] };
  dateValue: any;
  Options: any[] = [{ id: 1, name: 'By District' }, { id: 2, name: 'By Pincode' }];

  constructor(private cowinService: CowinService, private datePipe: DatePipe) {


  }


  ngOnInit(): void {

    this.cowinService.getStates().subscribe(

      {
        next: (result: States) => {
          debugger;
          this.States = result;
          console.log(result);
        },
        error: (result: any) => console.log(result)
      })
  }

  stateChange(event: MatSelectChange) {

    this.cowinService.getDistricts(event.value).subscribe(

      {
        next: (result: Districts) => {
          debugger;
          this.Districts = result;
          console.log(result);
        },
        error: (result: any) => console.log(result)
      });
  }

  findByDistrict() {
    var date = this.datePipe.transform(this.dateValue, 'dd-MM-yy') || '';


    if (this.value === 1) {
      this.cowinService.findByDistrict(this.selectedDistrict, date).subscribe(
        {
          next: (result: SessionsData) => {
            debugger;
            this.dataSource = result.sessions;
            console.log(result);
          },
          error: (result: any) => console.log(result)
        });

    } else if (this.value === 2) {
      this.cowinService.findByPincode(this.pincode, date).subscribe(
        {
          next: (result: SessionsData) => {
            debugger;
            this.dataSource = result.sessions;
            console.log(result);
          },
          error: (result: any) => console.log(result)
        });
    }





  }
}
