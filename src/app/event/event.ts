import {EventServicesService} from '../event-services.service';
import { Component } from '@angular/core';

export interface IEvent {
    code: number;
    EventName: string;
    EventDate: string;
    EventTime: string;
    City: string;
    CityTemperature?: number;
}

// this is event class
export class Event implements IEvent {
    public code: number;
    public EventName: string;
    public EventDate: string;
    public EventTime: string;
    public City: string;
    public Country: string;
    public CityTemperature?: number;

    constructor(code: number, EventName: string, EventDate: string, EventTIme: string, City: string, Country: string) {
        this.code = code;
        this.EventName = EventName;
        this.EventDate = EventDate;
        this.EventTime = EventTIme;
        this.City = City;
        this.Country = Country;
    }

}
