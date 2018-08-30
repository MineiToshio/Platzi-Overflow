import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
