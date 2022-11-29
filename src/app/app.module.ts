import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ConverterModule} from "./components/converter/converter.module";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./api/api.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ConverterModule,
        HttpClientModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
