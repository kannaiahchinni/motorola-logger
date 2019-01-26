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
  pageSize: any = 30;
  sortedData: LogFile[];
  pageEvent: PageEvent;
  result: any = {};
  dummy: any = {};
  env: any;
  node: any;
  fileName: any;

  constructor(public configService: ConfigService) {
     for ( let i = 0 ; i < 20; i++ ) {
         this.logData.push({ url: 'https://url' + i + '.com', fileName: 'xyz' + i });
     }
     Object.assign(this.result, {
       fileList: []
     });
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
      console.log(this.dummy.fileList);
      this.result.fileList  = this.dummy.fileList.slice(start, end);
      console.log(this.result.fileList);
  }

  prepareFilters() {

    this.envFormControl = new FormControl('', [Validators.required]);
    this.nodeFormControl = new FormControl('', [Validators.required]);
    this.orderFormControl = new FormControl('');
    this.nodes = this.config.filters.environment[0].nodes;

  }

  SelectEnv() {
     this.nodes = this.envFormControl.value.nodes;
  }

  search() {
    this.configService.showLoader(' Loading.. Please wait ');
    this.env = this.envFormControl.value.value;
    this.node = this.nodeFormControl.value;
    this.configService.getFileNames(this.envFormControl.value.value, this.nodeFormControl.value).subscribe( data => {
      this.dummy = data;
      this.result.fileList = this.dummy.fileList.slice(0, this.pageSize);
      this.length = this.dummy.fileList.length;
      this.configService.removeLoader();
    });
  }

  openFile(fileName) {
    const url = this.config.baseUrl + this.config.fileApi + '?filename=' + fileName + '&env=' + this.env + '&node=' + this.node;
    window.open(url, '_blank');
  }

}
