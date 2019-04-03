import { Injectable, OnInit } from '@angular/core';
import { Event } from '../event/event';
@Injectable({
  providedIn: 'root'
})
export class EventstorageService implements OnInit {
private listOfEvents: Event[] =
  [
  { code: 1, EventName: 'Bowling', EventDate: '02-12-2019 09:00 PM', EventTime: '02-12-2019 09:00 PM', City: 'Melbourne', Country: 'Australia' },
  { code: 2, EventName: 'Bingo Night', EventDate: '04-12-2019 10:00 PM', EventTime: '04-12-2019 10:00 PM', City: 'Sydney', Country: 'Australia' },
  { code: 3, EventName: 'Cooking Class', EventDate: '12-12-2019 03:00 PM', EventTime: '12-12-2019 03:00 PM', City: 'Brisbane', Country: 'Australia' }
];
  constructor() { }

  ngOnInit() {}

  // Return all events
  getEvents(): Event[] {
    return this.listOfEvents;
  }
  // Get an event
  getEvent(eventID: number): Event {
    for (let e of this.listOfEvents) {
      if (e.code === eventID) {
        return e;
      }
    }
  }
  // Add new event
  addEvent(_event: Event) {
    this.listOfEvents.push(_event);
  }
  // Get last index of event List
  getLastEventId(): number {
    let max = 0;
    for (let e of this.listOfEvents) {
     if (e.code > max) {
        max = e.code;
     }
    }
    return max;
  }

  // Update exsisting event
  updateEvent(_event: Event) {
   const eventIndex = this.listOfEvents.findIndex(e => e.code === _event.code);
   this.listOfEvents[eventIndex].EventName = _event.EventName;
   this.listOfEvents[eventIndex].EventDate = _event.EventDate;
   this.listOfEvents[eventIndex].EventTime = _event.EventTime;
   this.listOfEvents[eventIndex].City = _event.City;
   this.listOfEvents[eventIndex].Country = _event.Country;
  }

  // Delete an exsisting event
  deleteEvent(eventId: number) {
    const eventIndex = this.listOfEvents.findIndex(e => e.code === eventId);
    if (eventIndex > -1) {
      this.listOfEvents.splice(eventIndex, 1);
    }
  }

}
