import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
 imports: [BrowserModule, ModelModule, CoreModule, routing, BrowserAnimationsModule],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
