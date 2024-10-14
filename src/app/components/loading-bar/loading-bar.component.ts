import { Component, Input } from '@angular/core';

@Component({
  selector: 'bkng-loading-bar',
  standalone: true,
  imports: [],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss'
})
export class LoadingBarComponent {
  @Input({required: true, alias: 'class'}) LoadClass!: string;
}
