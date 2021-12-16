import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';
import { clear } from 'console';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  name = '';
  errorMessage = '';
  confirmMessage = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }
  submit() {

    const commaIndex = this.name.indexOf(', ');
    let error = false;




    if (commaIndex === -1) {
      console.log('Name Must Have a Comma!')
      this.errorMessage = 'Name Must Have a Comma!';
      error = true;
    }
    if (this.name === '') {
      console.log('Name Must Not Be Empty!')
      this.errorMessage = 'Name Must Not Be Empty!';
      error = true;
    }
    else if (commaIndex === -1) {
      this.errorMessage = 'Name Must Have a Comma!';
      error = true;
    }
    if (!error) {
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const FullName = firstName + ' ' + lastName

      const calculation = this.calculate();
      this.confirmMessage = 'Thank You For Your Order!'
      this.flexModal.openDialog('confirm-modal')
    }
    else {
      this.flexModal.openDialog('error-modal');
    }
  }

  async ngOnInit() {
    this.LoadDefaultOrders();
  }
  

  calculate() {
    const total = this.orders.reduce((inc, item, i, array) => {
      inc += item.price * item.quantity;
      return inc;
    }, 0);
    const taxAmount = total * .1;

    const subTotal = total - taxAmount
    console.log('from calculate() total: ', total, 'taxAmount', taxAmount, 'subTotal', subTotal);
    return {
      total: total
    }

  }
  LoadDefaultOrders() {
    this.orders = [{
      "pid": "1",
      "image": "assets/sm_hotdog.jpeg",
      "description": "Hot Dog",
      "price": 5.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image": "assets/sm_hamberger.jpeg",
      "description": "Hamberger",
      "price": 6.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image": "assets/sm_pizza.jpeg",
      "description": "Large Pizza",
      "price": 12.00,
      "quantity": 2
    }]
  }

  delete(index: number) {
    this.orders.splice(index, 1);
  }

  clear(){
    this.orders = []
  }



  addItem(item: string) {
    switch (item) {
      case 'hot dog':
        this.orders.unshift({
          "pid": "1",
          "image": "assets/sm_hotdog.jpeg",
          "description": "Hot Dog",
          "price": 5.00,
          "quantity": 0
        })

        break;
      case 'hamberger':
        this.orders.unshift({
          "pid": "2",
          "image": "assets/sm_hamberger.jpeg",
          "description": "Hamberger",
          "price": 6.00,
          "quantity": 0
        })
        break;
      case 'pizza':
        this.orders.unshift({
          "pid": "3",
          "image": "assets/sm_pizza.jpeg",
          "description": "Large Pizza",
          "price": 12.00,
          "quantity": 0
        })

        break;
    }
    
  }
}
