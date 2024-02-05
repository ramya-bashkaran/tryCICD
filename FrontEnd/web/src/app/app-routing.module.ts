import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  
  { path: 'create-employee', component: CreateEmployeeComponent },
{ path: 'search-employee', component: SearchEmployeeComponent },
{ path: 'show-employee', component: ShowEmployeeComponent },
{ path: 'update-employee', component: UpdateEmployeeComponent },
{ path: 'delete-employee', component: DeleteEmployeeComponent },
{ path: 'home', component: HomeComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
