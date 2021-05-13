import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Districts, States, SessionsData, AvailableSession } from '../models';
import { CowinService } from '../Services/cowin.service';

@Component({
  selector: 'app-vaccine-details',
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss']
})
export class VaccineDetailsComponent implements OnInit {

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
  single: any[];
  view: any = [1200, 150];
  stateValues: any[];
  resultValue:any;
  


  // options

  colorScheme = 'picnic';

  constructor(private cowinService: CowinService, private datePipe: DatePipe
    , private toast: MatSnackBar) {


  }


  ngOnInit(): void {

    this.cowinService.getDetailsForVaccine().subscribe(
      {
        next: (result: any) => {
          this.resultValue= result;
          this.single = [];
          this.single.push({ name: 'Male', value: result.topBlock.vaccination.male });
          this.single.push({ name: 'Female', value: result.topBlock.vaccination.female });
         
          this.single.push({ name: 'Above 60', value: result.vaccinationByAge.above_60 });
          this.single.push({ name: 'Between 18 & 30', value: result.vaccinationByAge.vac_18_30 });
          this.single.push({ name: 'Between 30 & 45', value: result.vaccinationByAge.vac_30_45 });
          this.single.push({ name: 'Between 45 & 60', value: result.vaccinationByAge.vac_45_60 });

          console.log(result);
        },
        error: (result: any) => console.log(result)
      })

    this.cowinService.getStates().subscribe(
      {
        next: (result: States) => {

          this.States = result;
          console.log(result);
        },
        error: (result: any) => console.log(result)
      })
  }

  onSelect(event: any) {
    console.log(event);
  }

  stateChange(event: MatSelectChange) {

    this.cowinService.getDistricts(event.value).subscribe(

      {
        next: (result: Districts) => {

          this.Districts = result;
          console.log(result);
        },
        error: (result: any) => console.log(result)
      });
  }

  findByDistrict() {
    if (this.value === 0) {
      this.toast.open('Please Select Option', '', { horizontalPosition: 'right', verticalPosition: 'top', duration: 750 });

    }
    else if (this.value === 1) {

      if (this.selectedDistrict === 0) {
        this.toast.open('Please Select District', '', { horizontalPosition: 'right', verticalPosition: 'top', duration: 750 });

      }

      else {
        var date = this.datePipe.transform(this.dateValue, 'dd-MM-yy') || '';

        this.cowinService.findByDistrict(this.selectedDistrict, date).subscribe(
          {
            next: (result: SessionsData) => {

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
        this.toast.open('Please Provide Pincode', '', { horizontalPosition: 'right', verticalPosition: 'top', duration: 750 });

      }
      else {
        var date = this.datePipe.transform(this.dateValue, 'dd-MM-yy') || '';

        this.cowinService.findByPincode(this.pincode, date).subscribe(
          {
            next: (result: SessionsData) => {

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
