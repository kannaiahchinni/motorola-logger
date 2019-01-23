import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


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
  };

  checkNotificationContainer(id) {
    const ele = document.getElementById(id);
    return ele;
  }

  /*showMessage(message, id) {
    const messageHtml = `<div class="snackbar"> <div class="icon">
          <i class="fa fa-check shadow" aria-hidden="true"></i></div>  <div class="info">\n` + message + `</div></div>`;
    var nodeEle = document.createElement('div');
    id = "snack-over-lay-"+id;
    console.log(id);
    nodeEle.setAttribute("id",id);
    nodeEle.innerHTML = messageHtml;
    //document.body.appendChild(nodeEle);
    sanckBarDom.appendChild(nodeEle);

    setTimeout(function(id) {
      return function() {
        var elem = document.getElementById(id);
        //document.body.removeChild(elem);
        sanckBarDom.removeChild(elem);
      };
    }(id),6000);
  }; */


}
