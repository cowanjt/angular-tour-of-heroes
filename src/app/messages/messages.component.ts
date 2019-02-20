import { Component, OnInit } from '@angular/core';
import { MessageService } from './../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Note that property is 'public' in order to bind it to the template.
  // Angular only binds 'public' component properties to the view.
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
