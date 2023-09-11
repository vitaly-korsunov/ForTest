import { Component } from "@angular/core";
import { Student } from "../model/student.model";
import { Model } from "../model/repository.model";

//import { MODES, SharedState } from "./sharedState.service";
@Component({
    selector: "paTable",
    templateUrl: "table.component.html"
})
export class TableComponent {
    constructor(private model: Model) { }
    getStudent(key: number): Student | undefined {
        return this.model.getStudent(key);
    }
    getStudents(): Student[] {
        return this.model.getStudents();
    }
    deleteStudent(key?: number) {
        if (key != undefined) {
            this.model.deleteStudent(key);
        }
    }
    colsAndRows: string[] = ['id', 'name', 'department', 'bdate', 'level', 'buttons'];
   /*  editStudent(key?: number) {
        this.state.update(MODES.EDIT, key)
    }
    createStudent() {
        this.state.update(MODES.CREATE);
    } */
}
 