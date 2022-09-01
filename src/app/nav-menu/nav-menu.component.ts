import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

declare const require;
const xml2js = require('xml2js');

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {

  public xmlItems: any;
  private http: HttpClient;

  loadXML() {
    /*Read Data*/
    this.http
      .get('assets/users.xml', {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append(
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
          ),
        responseType: 'text',
      })
      .subscribe((data) => {
        this.parseXML(data).then((data) => {
          this.xmlItems = data;
        });
      });
  }

  parseXML(data) {
    return new Promise((resolve) => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser({
          trim: true,
          explicitArray: true,
        });
      parser.parseString(data, function (err, result) {
        var obj = result.accounts;
        for (k in obj.account) {
          var item = obj.account[k];
          arr.push({
            id: item.id[0],
            name: item.name[0],
            email: item.email[0],
          });
        }
        resolve(arr);
      });
    });
  }

  openNav() {
    window.alert('The product has been shared!');
  }

  loadLoginForm() {
    document.getElementById('login').style.display = 'block';
  }

  helpPass() {
    window.alert('Message Dichroic on Discord');
  }

  loginAuth() {

  }
}
