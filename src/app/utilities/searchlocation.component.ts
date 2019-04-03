import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-searchlocation',
  template: `
  <div class="form-group" [class.has-error]="addresstext.invalid && addresstext.touched" [class.has-success]="addresstext.valid">
  <label for="eventCity" class="control-label">Location</label>
  <input required class="form-control"
  type="text"
  id= "eventLocation"
  [(ngModel)] = "Location"
  #addresstext = "ngModel"
  >
  <span class="help-block" *ngIf="addresstext.invalid && addresstext.touched">Event Location is required</span>
  </div>
  `,
  styles: []
})
export class SearchlocationComponent implements OnInit, AfterViewInit {
@Input()
Location: any;
@Output()
passEventLocation: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    const _this = this;
   // Jquery function for autocomplete the location
    $('#eventLocation').autocomplete({
      source: function(request, response) {
        $.ajax({
          url: 'http://gd.geobytes.com/AutoCompleteCity',
          dataType: 'jsonp',
          data: { q: request.term },
          success: function(data) {
            response(data);
            // console.log(data);
          }
        });
      },
      select: function( event, ui ) {
        _this.onLocationSelect(ui.item.value);
        // get the iso2 code of country
      }
    });
   }

   onLocationSelect(place: string) {
    this.passEventLocation.emit(place);
    // console.log(place);
   }

}
