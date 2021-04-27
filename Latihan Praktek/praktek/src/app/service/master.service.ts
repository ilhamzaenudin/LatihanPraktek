import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../model/data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Datatablesrequest } from '../model/datatablesrequest.model';


@Injectable({
    providedIn: 'root'
})
export class MasterService {

    constructor(private htkl: HttpClient) { }

    listData(): Observable<Data[]> {
        return this.htkl.get(environment.baseUrl + '/getdata')
            .pipe(map(data => data as Data[]));
    }

    insertData(objData: Data): Observable<any> {
        return this.htkl.post(environment.baseUrl + '/savedata', objData);
    }

    getKelasById(id: string): Observable<any> {
        return this.htkl.get(environment.baseUrl + '/getdatabyid/' + id)
            .pipe(map(data => data));
    }
    getListKelasAll(parameter: Map<string, any>, datatablesParameters: any): Observable<DataTablesResponse> {
        const dtReq = new Datatablesrequest();
        dtReq.draw = datatablesParameters.draw;
        dtReq.length = datatablesParameters.length;
        dtReq.start = datatablesParameters.start;
        dtReq.sortCol = datatablesParameters.order[0].column;
        dtReq.sortDir = datatablesParameters.order[0].dir;
        dtReq.extraParam = {};
        parameter.forEach((value, key: string) => {
            //@ts-ignore
            dtReq.extraParam[key] = value;
        });
        console.log(dtReq);
        return this.htkl.post(environment.baseUrl + '/getdata', dtReq).pipe(map(data => data as DataTablesResponse));
    }
}