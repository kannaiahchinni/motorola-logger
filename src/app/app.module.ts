import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {  LoadMaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './config.service';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { KfilterPipe } from './kfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogComponent,
    KfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
