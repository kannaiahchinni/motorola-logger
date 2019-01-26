import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  config: any;
  subscription: any;

  constructor(public configService: ConfigService) { }

  ngOnInit() {
    this.subscription = this.configService.updateEmitConfigUpdate().subscribe(config => {
        this.config = this.configService.getConfigData();
    });
    this.config = this.configService.getConfigData();
  }

  ngOnDestory() {

  }

}


