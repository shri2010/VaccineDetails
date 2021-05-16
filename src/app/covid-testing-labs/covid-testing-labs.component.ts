import { SelectionChange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { labsData } from '../data';
import { CowinService } from '../Services/cowin.service';

@Component({
  selector: 'app-covid-testing-labs',
  templateUrl: './covid-testing-labs.component.html',
  styleUrls: ['./covid-testing-labs.component.scss']
})
export class CovidTestingLabsComponent implements OnInit {

  labsData: any[] = labsData;
  States: any[];
  TestCategory: string[];
  selectTestCategory: string = '';
  filterData: any[];
  selectedState: string = '';
  result: any;
  govtArray: string[] = [];
  privArray: string[] = [];
  constructor(private dataService: CowinService) { }

  ngOnInit(): void {

    var stateSet = new Set();
    var testSet = new Set<string>();
    var stateValues = this.labsData.map(x => { return { state_id: x["S.\r\nNo."], state_name: x["Names of States"], category: x["Test Category"] } });

    this.States = stateValues.filter(x => { var isAvailable = stateSet.has(x.state_id); stateSet.add(x.state_id); testSet.add(x.category); return !isAvailable; })
    this.TestCategory = Array.from(testSet);
  }

  stateChange(events: any) {
    this.selectedState = events.value;
  }

  Result() {
    this.filterData = this.labsData.filter(x => x["S.\r\nNo."] === this.selectedState && x["Test Category"] === this.selectTestCategory).map(
      x => { return { Govt: x["Names of Government Institutes"], Private: x["Names of Private Institutes"] } }
    );

    this.result = {};
    this.govtArray=[];
    this.privArray=[];

    this.filterData.forEach(x => {
      if (x.Govt !== undefined && x.Govt !== '') {
        this.govtArray=this.govtArray.concat(x.Govt.split('\r\n'));
      }

      if (x.Private !== undefined && x.Private !== '') {
        this.privArray=this.privArray.concat(x.Private.split('\r\n'));
      }
      this.result.Govt = (this.result.Govt || '') + (x.Govt || '');

      this.result.Private = (this.result.Private || '') + (x.Private || '');
    })


  }

}
