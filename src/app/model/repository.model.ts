import { Injectable } from "@angular/core";
import { Student } from "./student.model";
import { StaticDataSource } from "./static.datasource";
import {Department} from "./department.model"
import { RestDataSource } from "./rest.datasource";
import { Observable, ReplaySubject } from "rxjs";

@Injectable()
export class Model {
    private students: Student[];
    private departments: Department[];

    private locator = (p: Student, id?: number) => p.id == id;

    private replaySubject: ReplaySubject<Student[]>;
    private replaySubjectDepartment: ReplaySubject<Department[]>;

    constructor(private dataSource: RestDataSource) {
        this.students = new Array<Student>();
        this.departments =new Array<Department>();

        this.replaySubject = new ReplaySubject<Student[]>(1);
        this.replaySubjectDepartment = new ReplaySubject<Department[]>(1);

        this.dataSource.getData().subscribe(data => {
            this.students = data
            this.replaySubject.next(data);
            this.replaySubject.complete();
        });

        this.dataSource.getDataDepartment().subscribe(data => {
            this.departments = data
            this.replaySubject.next(data);
            this.replaySubject.complete();
        });

        // this.dataSource.getData().forEach(p => this.products.push(p));
        this.dataSource.getData().subscribe(data => this.students = data);
        this.dataSource.getDataDepartment().subscribe(data => this.departments = data);
    }
    getStudents(): Student[] {
        return this.students;
    }

    getDepartments(): Department[] {
        return this.departments;
    }

    getStudent(id: number): Student | undefined {
        return this.students.find(p => this.locator(p, id));
    }

    getStudentObservable(id: number): Observable<Student | undefined> {
        let subject = new ReplaySubject<Student | undefined>(1);
        this.replaySubject.subscribe(students => {
            subject.next(this.students.find(p => this.locator(p, id)));
            subject.complete();
        });
        return subject;
    }

    
    saveStudent(student: Student) {
        if (student.id == 0 || student.id == null) {
            this.dataSource.saveStudent(student)
                .subscribe(p => this.students.push(p));
        } else {
            this.dataSource.updateStudent(student).subscribe(p => {
                let index = this.students
                    .findIndex(item => this.locator(item, p.id));
                this.students.splice(index, 1, p);
            });
        }
    }
    deleteStudent(id: number) {
        this.dataSource.deleteStudent(id).subscribe(() => {
            let index = this.students.findIndex(p => this.locator(p, id));
            if (index > -1) {
                this.students.splice(index, 1);
            }
        });
    }

}