import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name: string = '<b>XIn chào...</b>';
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    alert(12333);
  }

}
