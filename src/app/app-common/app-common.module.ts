import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlPipe } from './pipe/html.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HtmlPipe],
  imports: [
    CommonModule
    , FormsModule
  ]
  , exports: [
    CommonModule
    , FormsModule
    , HtmlPipe

  ]
})
export class AppCommonModule { }
