import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {_} from 'underscore';

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';
  config: any;
  snackBarDom: any;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient) {
    this.addsnackDOM();
  }

  emitConfigUpdate() {
    this.update.emit(true);
  }

  updateEmitConfigUpdate() {
    return this.update;
  }

  getConfig() {
     return this.http.get(this.configUrl);
  }
  setConfigData(config) {
    this.config = config;
    this.emitConfigUpdate();
  }
  getConfigData() {
    return this.config;
  }

  sortData(data) {
    return _.sortBy(data);
  }


  getLoaderText(text) {
    const loaderHtml = `<div class="km-overlay">
      <div class="km-modal km-vertical" id="modal">
      <div class="km-modal-content">
      <div class="km-loader"> </div>
      <div class="km-loading-text">` +  text + ` </div>
      </div>
      </div>
      </div>`;
    return loaderHtml;
  }

  addsnackDOM() {
    this.snackBarDom = document.createElement('div');
    this.snackBarDom.setAttribute('id', 'snack-over-lay-div');
    document.body.appendChild(this.snackBarDom);
  }

  showLoader(text) {
    const nodeEle = document.createElement('div');
    nodeEle.setAttribute('id', 'km-over-lay');
    nodeEle.innerHTML = this.getLoaderText(text || 'Loading...');
    document.body.appendChild(nodeEle);
  }

  removeLoader() {
    const elem = document.getElementById('km-over-lay');
    document.body.removeChild(elem);
  }

  checkNotificationContainer(id) {
    const ele = document.getElementById(id);
    return ele;
  }

  /*
    Calling rest api to pull the list.
   */
  getFileNames(env, node, searchString) {
    let url = this.config.baseUrl + this.config.restApi + '?env=' + env + '&node=' + node + '&fileContains=' + searchString;
    if (!this.config.live) {
      url = '/assets/dummy.json';
    }
    return this.http.get(url);
  }



}
