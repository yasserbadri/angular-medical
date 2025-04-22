import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: [
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ToolbarComponent {

}
