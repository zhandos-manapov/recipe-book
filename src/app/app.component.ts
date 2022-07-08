import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = '';
  currentWindow: string = 'recipes';

  handleEvent(eventData: string){
    this.currentWindow = eventData;
  }

}
