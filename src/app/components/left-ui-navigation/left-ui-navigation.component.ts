import { Component } from '@angular/core';

@Component({
  selector: 'bkng-left-ui-navigation',
  standalone: true,
  imports: [],
  templateUrl: './left-ui-navigation.component.html',
  styleUrl: './left-ui-navigation.component.scss'
})
export class LeftUiNavigationComponent {
  public UpdatePage() {
    window.location.reload();
  }
}
