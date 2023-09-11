import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
//import { NotFoundComponent } from "./core/notFound.component";
const routes: Routes = [
   // { path: "form/edit", component: FormComponent },
    //{ path: "form/create", component: FormComponent },
    { path: "form/:mode/:id", component: FormComponent },
    { path: "form/:mode", component: FormComponent },
    { path: "", component: TableComponent }]
export const routing = RouterModule.forRoot(routes);