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
import { FormsModule } from '@angular/forms';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { TransactionDetailsComponent } from './transactions/transaction-details/transaction-details.component';
import { FilterDatePipe } from '../helpers/filter-date.pipe';


const appRoutes = [
  { path: 'status', component: VendorStatusComponent},
  { path: 'transactions', component: TransactionsComponent},
  { path: 'lots', component: ParkingLotComponent},
  { path: 'transactions-details/:id', component: TransactionDetailsComponent}
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
    RouterModule.forChild(appRoutes),
    FormsModule,
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    VendorStatusComponent,
    TransactionsComponent,
    TransactionDetailsComponent,
    FilterDatePipe
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
