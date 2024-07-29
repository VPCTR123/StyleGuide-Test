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
        // this.mockData.Applications.forEach(a => {
        //     console.log("FROM SERVICE: " + a.id + "  ==? "+ app.id);
        //     if(a.id == app.id)
        //     {
        //         console.log("FROM SERVICE: match found");
        //         a = app;
        //         break;
        //     }
        // });

        for (var i = 0, len = this.mockData.Applications.length; i < len; i++)
        {
            //console.log("FROM SERVICE: " + this.mockData.Applications[i].id + "  ==? "+ app.id);
            if(this.mockData.Applications[i].id == app.id)
            {
                //console.log("FROM SERVICE: match found");
                this.mockData.Applications[i] = app;
                break;
            }
        }
        this.applicationSubject.next(this.mockData.Applications);
        //this.mockData.Applications.forEach(x => {console.log(x)});
    }

    public postApp(app:Application)
    {
        for (var i = 0, len = this.mockData.Applications.length; i < len; i++)
        {
            //console.log("FROM SERVICE: " + this.mockData.Applications[i].id + "  ==? "+ app.id);
            if(this.mockData.Applications[i].id == app.id)
            {
                console.log("FROM SERVICE: Cant add new App, ID collision");
                return;
            }
        }
        this.mockData.Applications.push(app);
        this.applicationSubject.next(this.mockData.Applications);
    }
}