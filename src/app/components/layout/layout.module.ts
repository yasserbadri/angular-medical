import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
