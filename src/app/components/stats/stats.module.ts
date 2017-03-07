// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../../shared/index';
import { CanActivateViaAuthGuard } from './../../guards/auth.guard';
import { ChartModule } from 'primeng/primeng';

const routes: Routes = [
  { path: '', component: StatsComponent, canActivate: [CanActivateViaAuthGuard] }
];

@NgModule({
  declarations: [
    // components
    StatsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ChartModule
  ]
})
export class StatsModule { }