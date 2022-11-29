import {Component} from '@angular/core';
import {Currency} from "../../types/currency";
import {ApiService} from "../../api/api.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
    currencyMap: Map<string, number> = new Map([["UAH", 1]])
    currencies: Currency[] = [{code: "UAH", rate: 1}]
    defaultFromTo: string[] = ["UAH", "USD"]

    select1: string = "UAH"
    select2: string = "USD"
    setSelect1: FormControl
    setSelect2: FormControl

    inp1: number = 1
    inp2: number = 1
    setInp1: FormControl
    setInp2: FormControl

    focusedElemNum: number = 1

    setLastFocus(numOfElem: number) {
        this.focusedElemNum = numOfElem
    }

    sum = (value: number, from: string, to: string) => {
        const selectRate1: number = this.currencyMap.get(from) ?? 1
        const selectRate2: number = this.currencyMap.get(to) ?? 1
        return selectRate1 && selectRate2 ? Math.ceil((selectRate2 / selectRate1) * 1000) / 1000 * value : 0
    }

    changeValues(){
        switch (this.focusedElemNum){
            case 1:
                this.inp2 = this.sum(this.inp1, this.select2, this.select1)
                break
            case 2:
                this.inp1 = this.sum(this.inp2, this.select1, this.select2)
                break
            default: break
        }
    }

    constructor(private apiService: ApiService) {
        this.setInp1 = new FormControl<number>(this.inp1)
        this.setInp2 = new FormControl<number>(this.inp2)
        this.setSelect1 = new FormControl<string>(this.select1)
        this.setSelect2 = new FormControl<string>(this.select2)
        this.setInp1.valueChanges.subscribe(value => {
            this.inp1 = value
            this.changeValues()
        })
        this.setInp2.valueChanges.subscribe(value => {
            this.inp2 = value
            this.changeValues()
        })
        this.setSelect1.valueChanges.subscribe(value => {
            this.select1 = value
            this.changeValues()
        })
        this.setSelect2.valueChanges.subscribe(value => {
            this.select2 = value
            this.changeValues()
        })

        apiService.getCurrents().subscribe(resp => {
            resp.map(item => this.currencies.push({code: item.cc, rate: item.rate}))
            this.currencyMap = new Map(this.currencies.map(item => [item.code, item.rate]))
            this.changeValues()
        })
    }
}
