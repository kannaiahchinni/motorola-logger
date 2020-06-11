import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {FormControl, Validators} from '@angular/forms';
import { PageEvent, MatSnackBar } from '@angular/material';

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
  ];
  displayedColumns: string[] = ['fileName'];
  length: any;
  pageSize: any = 50;
  sortedData: LogFile[];
  pageEvent: any;
  result: any = {};
  dummy: any = {};
  env: any;
  node: any;
  fileName: any;
  searchText: any;
  searchString: any;
  loading = false;

  constructor(public configService: ConfigService, public snackBar: MatSnackBar) {
     for ( let i = 0 ; i < 20; i++ ) {
         this.logData.push({ url: 'https://url' + i + '.com', fileName: 'xyz' + i });
     }
     Object.assign(this.result, {
       fileList: []
     });
    Object.assign(this.dummy, {
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
      if (this.config.applicationName) {
        this.getApplicationNames();
      }
    });

  }

  getServerData(event?: PageEvent) {
      const start = event.pageIndex * event.pageSize;
      const end = start + event.pageSize;
      this.result.fileList  = this.dummy.fileList.slice(start, end);
  }

  prepareFilters() {
    this.nodes = this.config.filters.environment[0].nodes;
    this.envFormControl = new FormControl(this.config.filters.environment[0], [Validators.required]);
    this.nodeFormControl = new FormControl(this.nodes[0], [Validators.required]);
    this.orderFormControl = new FormControl();
    this.getApplicationNames();

  }

  SelectEnv(event: any) {
     this.nodes = this.envFormControl.value.nodes;
     this.nodeFormControl.value = '';
  }

  SelectNode(event: any) {
    console.log(' selecting node ');
    this.getApplicationNames();
  }

  search() {
    this.searchText = '';
    this.env = this.envFormControl.value.value;
    this.node = this.nodeFormControl.value;
    console.log(this.orderFormControl);
    if ( !this.env || !this.node ) {
      this.snackBar.open('Please select Environment/Node', '', {
        duration: 2000,
      });
      return;
    }
    this.configService.showLoader(' Loading.. Please wait ');
    this.configService.getFileNames(this.envFormControl.value.value, this.nodeFormControl.value, this.orderFormControl.value,
      this.searchString || '' ).subscribe( data => {
      this.dummy = data['fileList'] || data;
      this.dummy.fileList = this.configService.sortData(this.dummy);
      this.result.fileList = this.dummy.fileList.slice(0, this.pageSize);
      this.length = this.dummy.fileList.length;
      this.configService.removeLoader();
    }, error => {

      this.configService.removeLoader();
      this.snackBar.open('Error occured.. Please try after some time', '', { duration: 5000});
    });
  }

  openFile(fileName: string) {
    const url = this.config.baseUrl + this.config.fileApi + '?filename=' + fileName + '&env=' + this.env + '&node=' + this.node;
    window.open(url, '_blank');
  }
  filterRecords(event: any) {
    if (event.target.value && event.target.value !== '') {
      const list = this.dummy.fileList.filter(function (item) {
        return item.toLowerCase().indexOf(event.target.value) > -1;
      });
      this.length = list.length;
      this.result.fileList  = list.slice(0, this.pageSize);
    } else {
      this.length = this.dummy.fileList.length;
      this.result.fileList  = this.dummy.fileList.slice(0, this.pageSize);
    }

  }

  getApplicationNames() {
    this.loading = true;
    this.configService.getApplicationNames(this.envFormControl.value.value, this.nodeFormControl.value).subscribe((res: any) => {
      console.log(res);
      this.config.filters.orderBy = res.fileList;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.log('error');
    })
  }

}
