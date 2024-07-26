import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MockData } from "./MockData";
import { Application } from "../Models/ApplicationModel";

/**
 * Mock data service to be replaced by a real API service once we've gotten to that point in the project
 */

@Injectable({
    providedIn: 'root',
})
export class MockDataService
{
    private mockData: MockData = new MockData();
    private applicationSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.mockData.Applications);

    public getApps()
    {
        return this.applicationSubject.asObservable();
    }

    public putApp(app:Application)
    {
        this.mockData.Applications.forEach(a => {
            if(a.id == app.id)
            {
                a = app;
            }
        });
        this.applicationSubject.next(this.mockData.Applications);
    }

    public postApp(app:Application)
    {

    }
}