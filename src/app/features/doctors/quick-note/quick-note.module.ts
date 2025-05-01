// quick-note.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickNoteComponent } from './quick-note.component';

@NgModule({
  declarations: [QuickNoteComponent],
  imports: [CommonModule],
  exports: [QuickNoteComponent] // Important pour l'utiliser ailleurs
})
export class QuickNoteModule {}