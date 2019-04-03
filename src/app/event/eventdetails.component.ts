import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng6-bootstrap-modal';

 interface EventAttributes {
  title: string;
  location: string;
  datetime: string;
}

@Component({
  selector: 'app-eventdetails',
  template: `
  <div class="modal-dialog">
  <div class="modal-content">
     <div class="modal-header">
       <button type="button" class="close" (click)="close()" >&times;</button>
       <h4 class="modal-title">{{title}}</h4>
     </div>
     <div class="modal-body">
      <div class="row">
        <div class="col-md-3">
          <p>Event Date/Time:</p>
          <p>Event Location:</p>
        </div>
        <div class="col-md-6">
          <p> {{datetime}}</p>
          <p>{{location}}</p>
        </div>
      </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-default" (click)="close()" >OK</button>
     </div>
   </div>
</div>
  `,
  styles: []
})




export class EventdetailsComponent extends DialogComponent<EventAttributes, boolean> implements EventAttributes {
  title: string;
  location: string;
  datetime: string;

  constructor(dialogservice: DialogService) {
    super(dialogservice);
   }

}
