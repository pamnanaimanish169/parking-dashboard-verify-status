import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorStatusComponent } from './vendor-status/vendor-status.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


const appRoutes = [
  { path: 'status', component: VendorStatusComponent},
  { path: 'transactions', component: TransactionsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    VendorStatusComponent,
    TransactionsComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
