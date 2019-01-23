import {Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements  OnInit {
  title = 'motorola-solutions';
  config: any;
  error: any;

  constructor(public  configService: ConfigService) {}

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
