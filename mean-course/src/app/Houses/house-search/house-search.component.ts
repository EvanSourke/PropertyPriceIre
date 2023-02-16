import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import {startWith, map} from 'rxjs/operators';




@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.css']
})

export class HouseSearchComponent implements OnInit {

  control = new FormControl('');
  counties: string[] = [
  'Antrim',
  'Armagh',
  'Carlow',
  'Cavan',
  'Clare',
  'Cork',
  'Derry',
  'Donegal',
  'Down',
  'Dublin',
  'Fermanagh',
  'Galway',
  'Kerry',
  'Kildare',
  'Kilkenny',
  'Laois',
  'Leitrim',
  'Limerick',
  'Longford',
  'Louth',
  'Mayo',
  'Meath',
  'Monaghan',
  'Offaly',
  'Roscommon',
  'Sligo',
  'Tipperary',
  'Tyrone',
  'Waterford',
  'Westmeath',
  'Wexford',
  'Wicklow'];

  properties: string[] = ['New Dwelling house /Apartment','Second-Hand Dwelling house /Apartment'];

  prices: string [] = ['50000','75000','100000','125000','150000','175000','200000','225000','250000','275000','300000','325000','350000','375000','400000','450000','500000','600000,','700000','800000','800000','1000000', '2000000','5000000']



  filteredCounties: Observable<string[]>;
  filteredProperties: Observable<string[]>;
  filteredPrices: Observable<string[]>;

  ngOnInit() {
    this.filteredCounties = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCounties(value || '')),
    );

    this.filteredProperties = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProperties(value || '')),
    );

    this.filteredPrices = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPrices(value || '')),
    );


  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  private _filterCounties(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.counties.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _filterPrices(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.prices.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _filterProperties(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.properties.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
