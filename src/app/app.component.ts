import {Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements  OnInit {
  title = 'motorola-solutions';
  config: any;
  error: any;
  showLog: Boolean = false;

  constructor(public  configService: ConfigService, public router: Router, public location: Location ) {
    this.router.events.subscribe( ( event?: any ) => {
      if ( this.location.path() === '/home') {
        this.showLog = true;
      } else {
        this.showLog = false;
      }
    });
  }

  ngOnInit() {
    this.configService.getConfig().subscribe(config => {
          this.config = config;
          this.configService.setConfigData(config);
       } , error => {
          this.error = error;
      }
    );
  }


}
