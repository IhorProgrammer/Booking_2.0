import { Component, Input, OnInit, signal } from '@angular/core';
import { MethodInfoClass } from '../../Classes/Method/MethodInfoClass';
import { FormsModule } from '@angular/forms';
import ResponseTemplate from '../../Classes/AppSetting/ResponseTemplate';
import { LoadingBarComponent } from "../loading-bar/loading-bar.component";
import { ActivatedRoute } from '@angular/router';
import { ViewComponentComponent } from '../view-component/view-component.component';

@Component({
  selector: 'bkng-method-item',
  standalone: true,
  imports: [FormsModule, LoadingBarComponent, ViewComponentComponent],
  templateUrl: './method-item.component.html',
  styleUrl: './method-item.component.scss'
})
export class MethodItemComponent  implements OnInit {
  @Input({required: true, alias: "data"}) data!: MethodInfoClass; 
  condition = signal("");

  public ConditionsArray!: string[]; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.snapshot.data['data']().then((x: MethodInfoClass) => {
      this.data = x;

      let ConditionsArrayTemp = [];
      if( this.data.codeShow ) ConditionsArrayTemp.push("Code");
      if( this.data.responseShow ) ConditionsArrayTemp.push("Response");
      if( this.data.viewShow ) ConditionsArrayTemp.push("View");
      this.ConditionsArray = ConditionsArrayTemp;

      this.condition.set(this.ConditionsArray[0] ?? "");
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
    navigator.clipboard.writeText(JSON.stringify(this.data.form.submit, null, 2))
    .then(() => {
      this._copyCodeText = "Save";    
      setTimeout(() => { this._copyCodeText = "Copy" },2000)
    })
  }

}

