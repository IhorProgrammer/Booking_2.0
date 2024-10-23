import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bkng-view-component',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `<div [innerHTML]="HTMLContent"></div>`,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ViewComponentComponent implements OnInit, OnChanges {
  @Input({required: true, alias: "template-url"}) templateUrl!: string;  
  @Input({required: true, alias: "data"}) data: any;
  public HTMLContent: string = "";

  constructor(private http: HttpClient) {}

  private ResponseHTML: string = ""; 

  ngOnInit() {
    if (this.templateUrl) {
      const htmlContent$ = this.http.get(this.templateUrl, { responseType: 'text' });
      htmlContent$.subscribe( (res) => {
        //_--_ найти все вхождения, где есть _-data*-_
        //вставить data, если data.first то я вставляю даные из data.first
        this.ResponseHTML = res;
        this.changeText(); 
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.changeText();
    }
  }

  private changeText() {
    this.HTMLContent = this.replacePlaceholders(this.ResponseHTML, JSON.parse(this.data)); 
  }

  private replacePlaceholders(res: string, data: any) {
    if(data == undefined) return res;
    return res.replace(/_-data\.([\w.]+)-_|_-data-_|\[\[data\]\]/g, (match, key) => {
      if (key) {
        const keys = key.split('.'); // Розбиваємо шлях на ключі
        let value = data;
    
        // Ітеруємося по ключах, щоб знайти вкладену властивість
        for (const k of keys) {
          if (value && value[k] !== undefined) {
            value = value[k];
          } else {
            return ''; // Якщо ключ не знайдено, видаляємо шаблон
          }
        }
    
        return value !== undefined && value !== null ? value : ''; // Повертаємо знайдене значення, або видаляємо шаблон
      } else {
        return data; // Повертаємо весь об'єкт data, якщо знайдено _-data-_
      }
    });
  }
}
