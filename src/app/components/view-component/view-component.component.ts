import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
  @Input({required: true, alias: "html"}) html!: string;
  @Input({required: true, alias: "css"}) css!: string;  
  @Input({required: true, alias: "data"}) data: any;
  public HTMLContent: string = "";

  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {}

  private ResponseHTML: string = ""; 

  ngOnInit() {
    if (this.html) {
      const htmlContent$ = this.http.get(this.html, { responseType: 'text' });
      htmlContent$.subscribe( (res) => {
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

  //_--_ найти все вхождения, где есть _-data*-_
  //вставить data, если data.first то я вставляю даные из data.first      
  private changeText() {
    const styleTag = `<style>@import url('${this.css}');</style>`;
    this.HTMLContent = this.replacePlaceholders(this.ResponseHTML, JSON.parse(this.data));
    // Додаємо CSS-файл у DOM через Renderer2
    const linkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkElement, 'href', this.css);
    
    // Додаємо link до контейнера
    this.renderer.appendChild(this.el.nativeElement, linkElement);
  }

  private replacePlaceholders(res: string, data: any): string {
    if (data === undefined) return res;

    return res.replace(/_-data\.([\w.\[\]0-9]+)-_|_-data-_|\[\[data\]\]/g, (match, key) => {
        if (key !== undefined) {
            // Розбиваємо шлях на частини, враховуючи індекси масивів
            const keys = key.split('.').map((k:any) => k.replace(/\[(\d+)\]/g, '.$1')).join('.').split('.');

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
            return JSON.stringify(data); // Повертаємо весь об'єкт data, якщо знайдено _-data-_
        }
    });
  }

}
