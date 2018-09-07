import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
