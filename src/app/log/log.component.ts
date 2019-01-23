import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {FormControl, Validators} from '@angular/forms';
import { PageEvent } from '@angular/material';

export interface LogFile {
  fileName: string;
  url: string;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})

export class LogComponent implements OnInit {
  config: any;
  subscription: any;
  envFormControl: any;
  nodeFormControl: any;
  orderFormControl: any;
  nodes: any = [];
  logData: LogFile[] = [
    {url: 'https://url.com' , fileName: 'xyz'},
    {url: 'https://url12.com' , fileName: 'xyz123'}
  ]
  displayedColumns: string[] = ['fileName'];
  length: any;
  pageSize: any = 10;
  sortedData: LogFile[];
  pageEvent: PageEvent;

  constructor(public configService: ConfigService) {
     for ( let i = 0 ; i < 20; i++ ) {
         this.logData.push({ url: 'https://url' + i + '.com', fileName: 'xyz' + i });
     }

  }

  ngOnInit() {
    this.config = this.configService.getConfigData();
      if (this.config) {
        this.prepareFilters();
      }

    this.subscription = this.configService.updateEmitConfigUpdate().subscribe(config => {
      this.config = this.configService.getConfigData();
      this.prepareFilters();
    });

    this.length =  this.logData.length;
    console.log(this.pageSize);
    this.sortedData = this.logData.slice(1, this.pageSize);
    console.log(this.sortedData.length);

  }

  getServerData(event?: PageEvent) {
      console.log(event);
      const start = event.pageIndex * event.pageSize;
      const end = start + event.pageSize;
    this.sortedData = this.logData.slice(start, end);
  }

  prepareFilters() {

    this.envFormControl = new FormControl('', [Validators.required]);
    this.nodeFormControl = new FormControl('', [Validators.required]);
    this.orderFormControl = new FormControl('', [Validators.required]);
    this.nodes = this.config.filters.environment[0].nodes;

  }

  SelectEnv() {
     this.nodes = this.envFormControl.value.nodes;
  }

  search() {
    this.configService.showLoader(' Loading.. Please wait ');

    setTimeout(() => {
      this.configService.removeLoader();
    }, 3000);
  }

}
