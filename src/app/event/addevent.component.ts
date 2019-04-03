import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import {EventListComponent} from '../event-list/event-list.component';
import { NgForm } from '@angular/forms';
import { EventstorageService } from '../event/eventstorage.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styles: [],
  providers: [EventListComponent]
})
export class AddeventComponent implements OnInit {
  newEvent: Event;
  eventAddress: string;
  // Customize datepicker
  datePickerConfig: Partial<BsDatepickerConfig>;
  // time picker default time
  eventTime: Date = new Date();
  constructor(private _eventStorageService: EventstorageService, private _router: Router) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD-MM-YYYY'
  } );
  }

  ngOnInit() {}

  getLocation(place: string) {
    this.eventAddress = place;
    // console.log(place);
  }
  // Pass the new event to event list in eventstorage
  saveEvent(eForm: NgForm): void {
      // create new event object and add to the event list
      this.newEvent = {code: this._eventStorageService.getLastEventId() + 1 , EventName: eForm.value.eventName,
        EventDate: eForm.value.eventDate, EventTime: eForm.value.eventTime, City: this.eventAddress.split(',')[0] , Country: this.eventAddress.split(',')[2].trim() };
      this._eventStorageService.addEvent(this.newEvent);
      // Ridirect to event list (home)
      this.navEventList();
  }
  // navigae back to event list method
  navEventList() {
     this._router.navigateByUrl('/home');
  }
}
