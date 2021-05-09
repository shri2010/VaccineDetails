import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { retryWhen } from 'rxjs/operators';
import { Districts, States, SessionsData, AvailableSession } from './models';
import { CowinService } from './Services/cowin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['name', 'slots', 'fee', 'vaccine'];
  dataSource: MatTableDataSource<AvailableSession>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'VaccineInfoApp';
  States: States = {};
  Districts: Districts = {};
  selectedDistrict: number = 0;
  value: number = 0;
  pincode: string = '';
  SessionsData: SessionsData = { sessions: [] };
  dateValue: any;
  Options: any[] = [{ id: 1, name: 'By District' }, { id: 2, name: 'By Pincode' }];


  constructor(private cowinService: CowinService, private datePipe: DatePipe
    , private toast: MatSnackBar) {


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
    if (this.value === 0) {
      this.toast.open('Please Select Option', '', { horizontalPosition: 'right', verticalPosition: 'top', duration:750 });

    }
    else if (this.value === 1) {

      if (this.selectedDistrict === 0) {
        this.toast.open('Please Select District', '', { horizontalPosition: 'right', verticalPosition: 'top' , duration:750});

      }

      else {
        var date = this.datePipe.transform(this.dateValue, 'dd-MM-yy') || '';

        this.cowinService.findByDistrict(this.selectedDistrict, date).subscribe(
          {
            next: (result: SessionsData) => {
              debugger;
              this.dataSource = new MatTableDataSource(result.sessions);

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              console.log(result);
            },
            error: (result: any) => console.log(result)
          });
      }

    } else if (this.value === 2) {
      if (this.pincode === '' || this.pincode === undefined) {
        this.toast.open('Please Provide Pincode', '', { horizontalPosition: 'right', verticalPosition: 'top', duration:750 });

      }
      else {
        var date = this.datePipe.transform(this.dateValue, 'dd-MM-yy') || '';

        this.cowinService.findByPincode(this.pincode, date).subscribe(
          {
            next: (result: SessionsData) => {
              debugger;
              this.dataSource = new MatTableDataSource(result.sessions);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;


              console.log(result);
            },
            error: (result: any) => console.log(result)
          });
      }
    }

  }

}
