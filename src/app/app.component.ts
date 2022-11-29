import {Component} from '@angular/core';
import {ApiData} from "./types/currency";
import {ApiService} from "./api/api.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'exchange-rates-ng';
    headerData: ApiData[] = []
    private currencyCodes = ["USD", "EUR"]

    constructor(private apiService: ApiService) {
        apiService.getCurrents().subscribe(resp => {
            this.headerData = resp.filter(item => this.currencyCodes.includes(item.cc))
        })
    }
}

