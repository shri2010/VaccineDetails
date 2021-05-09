import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { CowinService } from '../Services/cowin.service';

@Component({
  selector: 'app-hospitals-india',
  templateUrl: './hospitals-india.component.html',
  styleUrls: ['./hospitals-india.component.scss']
})
export class HospitalsIndiaComponent  implements AfterViewInit {
  displayedColumns: string[] = ['cityname', 'hospitalname', 'hospitaladdress'];
  
  filteredAndPagedIssues: Observable<any[]>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cowinService: CowinService) {}

  ngAfterViewInit() {
    
    if (this.sort) {
      this.filteredAndPagedIssues = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
         
          this.isLoadingResults = true;
          return this.cowinService!.getHospitals(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
          
          return data.records;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
    }

   
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }
}

