import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import { BootstrapModalModule } from 'ng6-bootstrap-modal';
import {FormsModule} from '@angular/forms';

// ngx-bootstrap controls
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import {EventServicesService} from './event-services.service';
import { EventdetailsComponent } from './event/eventdetails.component';
import { AddeventComponent } from './event/addevent.component';
import { GoogleplacesComponent } from './utilities/googleplaces.component';
import {EventstorageService} from './event/eventstorage.service';
import { SearchlocationComponent } from './utilities/searchlocation.component';
import { UpdateEventComponent } from './event/update-event.component';
import { DeleteEventComponent } from './event/delete-event.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventListComponent,
    EventdetailsComponent,
    AddeventComponent,
    GoogleplacesComponent,
    SearchlocationComponent,
    UpdateEventComponent,
    DeleteEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule,
    BootstrapModalModule.forRoot({container: document.body}),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  entryComponents: [
    EventdetailsComponent,
    DeleteEventComponent
  ],
  providers: [EventServicesService, EventstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
