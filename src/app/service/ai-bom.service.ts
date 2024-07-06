import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from "@angular/fire/compat/database";
//import { AngularFireDatabase } from "@angular/fire/compat";


@Injectable({
  providedIn: 'root'
})
export class AiBomService {

  private API_URL = 'https://services.nvd.nist.gov/rest/json';
  constructor(
    private http: HttpClient,
    private angularFireDB: AngularFireDatabase
    ) { }

  getCVEs(keywoard: string){
    return this.http.get(`${this.API_URL}/cves/2.0?keywordSearch=${keywoard}`)
  }

  getMetaData(keywoard: string){
    return this.angularFireDB.list('aibom', x => x.orderByChild('searchKey').equalTo(keywoard)).valueChanges();
  }
}
