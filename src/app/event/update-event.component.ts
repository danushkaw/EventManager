import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventstorageService } from './eventstorage.service';
import { Event } from '../event/event';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html'
})
export class UpdateEventComponent implements OnInit {

  // Event variable to perform update
  private event: Event;
  datePickerConfig: Partial<BsDatepickerConfig>;
  eventAddress: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private _eventStorageservice: EventstorageService) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD-MM-YYYY'
    });
  }

  ngOnInit() {
    // Obtain the route parameter from the url
    this._route.paramMap.subscribe(paraMap => {
      const eid = +paraMap.get('id');
      this.event  = this._eventStorageservice.getEvent(eid);
    });
    // Set formatted event location at init
    this.eventAddress = this.getEventLocation();
  }

  // set the location for location search child component
  getEventLocation(): string {
    return this.event.City + ', ,' + this.event.Country;
  }
  // Get Event Location from child component
  getLocation(place: string) {
    this.eventAddress = place;
    // console.log(place);
  }
  // update event in storage
  updateEvent(form: NgForm): void {
    // Call the update event in eventStorage and pass updated object
    const e:  Event = {
      code: form.value.eventCode, EventName: form.value.eventName, EventDate: form.value.eventDate,
      EventTime: form.value.eventTime, City: this.eventAddress.split(',')[0] , Country: this.eventAddress.split(',')[2].trim()
    };
    this._eventStorageservice.updateEvent(e);
    this.navEventList();
  }
 // navigae back to event list method
 navEventList() {
  this._router.navigateByUrl('/home');
}

}
