import { Component, OnInit } from '@angular/core';
import { FlexModalService } from './shared-components/flex-modal/flex-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final';
  aboutText: string = 'Created By Tyler Solley (C) 2021';
  constructor(private flexModal: FlexModalService) { }

  ngOnInit() {
  }

  ShowHelpText() {
    alert(this.aboutText)
  }



  
  
}
