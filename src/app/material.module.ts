import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatInputModule, MatListModule } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
