import { Component } from "@angular/core";
import { FormControl, NgForm, Validators, FormGroup } from "@angular/forms";
import { Student } from "../model/student.model";
import { Model } from "../model/repository.model"
import { LimitValidator } from "../validation/limit";
import { ActivatedRoute, Router } from "@angular/router";
import { Department } from "../model/department.model";
@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    student: Student = new Student();
    editing: boolean = false;
    gender!:boolean;
     

    
      /*departments=[
        { id :1, value:"Dep 1"},
        { id :2, value:"Dep 2"}, 
        { id :3, value:"Dep 3"}
       ]   */
        departments?:any
       
   
        
    constructor(public model: Model, activeRoute: ActivatedRoute,
        public router: Router) {
            this.departments=this.model.getDepartments();
            console.log(this.model.getDepartments());
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        let id = activeRoute.snapshot.params["id"];
        if (id != null) {
            model.getStudentObservable(id).subscribe(p => {
                Object.assign(this.student, p || new Student());
               /*  this.student.name = activeRoute.snapshot.params["name"]
                    ?? this.student.name;
                this.student.department = activeRoute.snapshot.params["department"]
                    ?? this.student.department;
                let bdate = activeRoute.snapshot.params["bdate"];
                if (bdate != null) {
                    this.student.bdate == bdate;
                }
                let level = activeRoute.snapshot.params["level"];
                if (level != null) {
                    this.student.level == Number.parseFloat(level);
                }  */
                this.studentForm.patchValue(this.student);
            });
        }
    }
    studentForm: FormGroup = new FormGroup({
        name: new FormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("^[A-Za-z ]+$")
            ],
            updateOn: "change"
        }),
        department: new FormControl("", { validators: Validators.required }),
        bdate: new FormControl("", { validators: Validators.required }),
        gender :new FormControl("", { validators: Validators.required }),
        level: new FormControl("", {
            validators: [
                Validators.required, Validators.pattern("^[0-9\.]+$"),
                LimitValidator.Limit(300)
            ]
        }),
    });


    /* constructor(private model: Model, private state: SharedState,
        private messageService: MessageService) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd))
        this.messageService.reportMessage(new Message("Creating New Student"));
    } */

    /*  handleStateChange(newState: StateUpdate) {
         this.editing = newState.mode == MODES.EDIT;
         if (this.editing && newState.id) {
             Object.assign(this.student, this.model.getStudent(newState.id)
                 ?? new Student());
             this.messageService.reportMessage(
                 new Message(`Editing ${this.student.name}`));
 
         } else {
             this.student = new Student();
             this.messageService.reportMessage(new Message("Creating New Student"));
 
         }
         this.studentForm.reset(this.student);
     } */

    submitForm() {
        if (this.studentForm.valid) {
            Object.assign(this.student, this.studentForm.value);
            console.log(this.studentForm.value);
            this.model.saveStudent(this.student);
            this.router.navigateByUrl("/");
        }
    }
    resetForm() {
        this.editing = true;
        this.student = new Student();
        this.studentForm.reset();
    }
}