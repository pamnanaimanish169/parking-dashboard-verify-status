import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorStatusComponent } from './vendor-status/vendor-status.component';

const appRoutes = [
  { path: 'status', component: VendorStatusComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    VendorStatusComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
