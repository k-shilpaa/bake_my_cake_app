import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order!: Order;
  currentDate!: Date;
  // dateCaptured: boolean = false;
  ngOnInit(): void {
    // this.currentDate = this.dateService.getCurrentDate();
    
    
    this.activatedRoute.paramMap.subscribe((param) => {
      let id = param.get('id') ?? '';
      this.getOrder(id);
    });
  }
  
  constructor(private orderService: OrderService,private activatedRoute: ActivatedRoute) {}
  getOrder(id: string) {
    this.orderService.getOrder(id).subscribe({
      next: (data) => {
        console.log(data)
        this.order = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 
}
