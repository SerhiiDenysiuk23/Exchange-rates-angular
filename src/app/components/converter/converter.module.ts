import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConverterComponent} from './converter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ConverterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ConverterComponent
    ]
})
export class ConverterModule {
}
