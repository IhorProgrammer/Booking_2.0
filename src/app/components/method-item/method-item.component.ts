import { Component, Input, OnInit, signal } from '@angular/core';
import { MethodInfoClass } from '../../Classes/Method/MethodInfoClass';
import { FormsModule } from '@angular/forms';
import ResponseTemplate from '../../Classes/AppSetting/ResponseTemplate';
import { LoadingBarComponent } from "../loading-bar/loading-bar.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bkng-method-item',
  standalone: true,
  imports: [FormsModule, LoadingBarComponent],
  templateUrl: './method-item.component.html',
  styleUrl: './method-item.component.scss'
})
export class MethodItemComponent  implements OnInit {
  @Input({required: true, alias: "data"}) data!: MethodInfoClass; 
  condition = signal("Code");

  public get ConditionsArray() : string[] {
    return ["Code", "View", "Response"];
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.snapshot.data['data']().then((x: MethodInfoClass) => {
      this.data = x
    });
  }

  public get Response(): string {
    return ResponseTemplate.Get;
  }

  //Сopy Button
  private _copyCodeText: string = "Copy";
  public get CopyCodeText(): string {
    return this._copyCodeText;
  }

  public copyCode(): void {
    navigator.clipboard.writeText(this.data.form.submit.toString())
    .then(() => {
      this._copyCodeText = "Save";    
      setTimeout(() => { this._copyCodeText = "Copy" },2000)
    })
  }

}

