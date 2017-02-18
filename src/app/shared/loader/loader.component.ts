import { Component } from '@angular/core';

@Component({
  selector: 'tr-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  inputs: ["message", "noOfParas"]
})
export class LoaderComponent{
  public message: string = "Loading";
  public noOfParas: number = 2;

  createRange(len=20) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
