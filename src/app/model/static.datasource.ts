import { Injectable } from "@angular/core";
import { Student } from "./student.model";
@Injectable()
export class StaticDataSource {
    private data: Student[];
    constructor() {
        this.data = new Array<Student>(
            new Student(1, "Kayak", "Watersports", new Date('2020-01-01'),"" ,275),
            new Student(2, "Lifejacket", "Watersports", new Date('2020-11-01'),"1",48.95),
            new Student(3, "Soccer Ball", "Soccer", new Date('2020-08-01'),"",19.50),
            new Student(4, "Corner Flags", "Soccer", new Date('2022-04-01'),"2",34.95),
            new Student(5, "Thinking Cap", "Chess", new Date('2021-06-01'),"2",16));
    }
    getData(): Student[] {
        return this.data;
    }
}