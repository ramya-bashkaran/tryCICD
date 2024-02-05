import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateEmployeeComponent,
    SearchEmployeeComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    ShowEmployeeComponent,
    HomeComponent,
    UpdatePopupComponent,
    CustomSnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
BrowserAnimationsModule,
FontAwesomeModule,
 FormsModule,
 ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
