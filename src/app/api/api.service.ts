import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiData} from "../types/currency";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getCurrents(): Observable<ApiData[]> {
        return this.http.get<ApiData[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    }
}
