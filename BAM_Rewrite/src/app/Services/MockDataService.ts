import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MockData } from "./MockData";

@Injectable({
    providedIn: 'root',
})
export class MockDataService
{
    private mockData: MockData = new MockData();
    private applicationSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.mockData.Applications);

    getApps()
    {
        return this.applicationSubject.asObservable();
    }
}