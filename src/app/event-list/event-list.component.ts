import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import {EventServicesService} from '../event-services.service';
import { DialogService } from 'ng6-bootstrap-modal';
import { EventdetailsComponent } from '../event/eventdetails.component';
import { EventstorageService } from '../event/eventstorage.service';
import { RouterEvent, Router } from '@angular/router';
import { text } from '@angular/core/src/render3';
import { DeleteEventComponent } from '../event/delete-event.component';

declare var $: any;


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: []
})
export class EventListComponent implements OnInit {

  events: Event[];
  private eventService: EventServicesService;
  private eventdialogService: DialogService;
  selected_event: Event;
  constructor(eventService: EventServicesService, eventdialogService: DialogService, private _eventStorageservice: EventstorageService, private _router: Router) {
    this.eventService  = eventService;
    this.eventdialogService = eventdialogService;
  }
  ngOnInit() {
    // Local variables
    const self = this;
    // Set event array
    this.events = this._eventStorageservice.getEvents();
    // Set Temperature
    for ( let e of this.events) {
        this.eventService.getTemperature(e.City, e.Country).subscribe((response) => {
        e.CityTemperature = response.main.temp;
        // console.log(e.CityTemperature);
    });
    }
// Jquery function to get event id on row click
    $('#tblEventList tbody').on('click', 'tr', function(e) {
      // pass the id and get selected event
      let $eventID = $(this).find('.eid').html();
      self.selected_event = self.getEvent(+$eventID);
      //  console.log((e.target));
        if (e.target.type !== 'button'  ) {
      // Display modal popup
      self.showEventDetails();
        }
    });
// Jquery function to click buttons in the table row (edit delete)
    $('#tblEventList tbody').on('click', 'button', function(e) {
      // pass the id and get selected event
      let $eventID = e.target.value;
      // console.log(e.target.value);
      self.selected_event = self.getEvent(+$eventID);
       if (e.target.name === 'btnedit') {
          // popup edit dialog
          // Redirect to edit view
          self.editEvent();
       } else if (e.target.name === 'btndel') {
          // popup delete dialog
          self.deleteEvent();
       }
    });
  }
  // Nevigate to edit event page and pass the event id as route parameter
  editEvent() {
    this._router.navigate(['/edit', this.selected_event.code]);
  }

 // Initialize the event delete popup and subscribe the dialog service
 deleteEvent() {
  const popupModal = this.eventdialogService.addDialog(DeleteEventComponent, {
    title: this.selected_event.EventName,
    eventID: this.selected_event.code}).subscribe(response => {
      // get dialog result
    });
 }

  // Call the eventDialogService to open modal popup and pass data to display
  showEventDetails() {
    let disposable = this.eventdialogService.addDialog(EventdetailsComponent, {
        title: this.selected_event.EventName,
        datetime: this.selected_event.EventDate,
        location: this.selected_event.City + ' ' + this.selected_event.Country})
        .subscribe((response) => {
            // We get dialog result
        });
      }
  // Get an event method
  getEvent(eventID: number): Event {
    for ( let e of this.events) {
      if (e.code === eventID) {
        this.selected_event = e;
        // console.log(e);
        return e;
      }
    }
  }
}
