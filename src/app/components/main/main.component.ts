import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MethodItemComponent } from "../method-item/method-item.component";
import { MethodInfoClass } from '../../Classes/Method/MethodInfoClass';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bkng-main',
  standalone: true,
  imports: [HeaderComponent, MethodItemComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @Input() data!: MethodInfoClass;
}
