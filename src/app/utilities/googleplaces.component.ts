import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
/// <reference types="@types/googlemaps" />
declare var google;

@Component({
  selector: 'app-googleplaces',
  template: `
  <input class="form-control"
  type="text"
  [(ngModel)]="eventLocation"
  #addresstext
  >
  `,
  styles: []
})
export class GoogleplacesComponent implements OnInit, AfterViewInit {
  @Input()
  adressType: string;
  @Output()
  setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext')
  addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
        {
            componentRestrictions: { country: 'AU' },
            types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
        });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.invokeEvent(place);
    });
}
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
