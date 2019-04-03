import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng6-bootstrap-modal';
import { EventstorageService } from './eventstorage.service';
interface EventAttributes {
  title: string;
  eventID: number;
}



@Component({
  selector: 'app-delete-event',
  template: `
  <div class="modal-dialog">
  <div class="modal-content">
     <div class="modal-header">
       <button type="button" class="close" (click)="close()" >&times;</button>
       <h4 class="modal-title">Delete Event</h4>
     </div>
     <div class="modal-body">
       <p>Are you sure? Delete Event {{title}}</p>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
       <button type="button" class="btn btn-default" (click)="deleteEvent()" >OK</button>
     </div>
   </div>
</div>
  `,
  styles: []
})
export class DeleteEventComponent extends DialogComponent<EventAttributes, boolean> implements EventAttributes {
  title: string;
  eventID: number;

  constructor(dialogservice: DialogService, private _eventStorageservice: EventstorageService) {
    super(dialogservice);
   }

   // Call delete event method in storage service and pass event id
   deleteEvent() {
      this._eventStorageservice.deleteEvent(this.eventID);
     this.close();
   }
}
