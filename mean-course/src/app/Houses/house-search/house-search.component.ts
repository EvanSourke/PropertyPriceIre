import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import {startWith, map} from 'rxjs/operators';
import { HousesService } from "../houses.service";



@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.css']
})

export class HouseSearchComponent implements OnInit {


  MainForm : FormGroup;
  DateForm : FormGroup;

  constructor(public housesService: HousesService){
    this.initializeForm();
  };

  initializeForm(){
    this.MainForm = new FormGroup({
      County: new FormControl(''),
      PropertyType: new FormControl(''),
      PriceFrom: new FormControl(''),
      PriceTo: new FormControl(''),
      Address: new FormControl(''),
      Start: new FormControl(''),
      End: new FormControl('')
    });

  }


  PriceSearch=true;
  AddressSearch=false;
 toggleSearch1(){
  this.PriceSearch=true;
  this.AddressSearch=false;
 };
 toggleSearch2(){
  this.PriceSearch=false;
  this.AddressSearch=true;
 };


  //control = new FormControl('');
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

  prices: string [] = ['50000','75000','100000','125000','150000','175000','200000','225000','250000','275000','300000','325000','350000','375000','400000','450000','500000','600000','700000','800000','800000','1000000', '2000000','5000000']

  filteredCounties: Observable<string[]>;
  filteredProperties: Observable<string[]>;
  filteredPrices: Observable<string[]>;

  priceSearch(){
    console.log(this.MainForm.get('County').value, this.MainForm.get('PropertyType').value, this.DateForm.get('Start').value, this.DateForm.get('End').value, this.MainForm.get('PriceFrom').value, this.MainForm.get('PriceTo').value);

    this.housesService.getHouses(this.MainForm.get('County').value, this.MainForm.get('PropertyType').value, this.DateForm.get('Start').value, this.DateForm.get('End').value, this.MainForm.get('PriceFrom').value, this.MainForm.get('PriceTo').value);
  }


  ngOnInit() {


    this.filteredCounties = this.MainForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCounties(value || '')),
    );

    this.filteredProperties = this.MainForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProperties(value || '')),
    );

    this.filteredPrices = this.MainForm.valueChanges.pipe(
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
    return this.counties.filter(counties => this._normalizeValue(value).includes(filterValue));
  }

  private _filterPrices(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.prices.filter(prices => this._normalizeValue(value).includes(filterValue));
  }

  private _filterProperties(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.properties.filter(prices => this._normalizeValue(value).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }


}
