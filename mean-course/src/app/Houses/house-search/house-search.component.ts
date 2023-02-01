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



  filteredCounties: Observable<string[]>;
  filteredProperties: Observable<string[]>;

  ngOnInit() {
    this.filteredCounties = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCounties(value || '')),
    );

    this.filteredProperties = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProperties(value || '')),
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

  private _filterProperties(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.properties.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
