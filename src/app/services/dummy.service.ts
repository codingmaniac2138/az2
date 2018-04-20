import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
export class DummyService {
    headingSubject = new BehaviorSubject("");

    constructor() {}
}