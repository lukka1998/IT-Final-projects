import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  get cartItems(): any[] {
    return this.cartItemsSubject.value;
  }

  set cartItems(items: any[]) {
    this.cartItemsSubject.next(items);
  }

  addToCart(item: any) {
    const currentItems = this.cartItems;
    currentItems.push(item);
    this.cartItems = currentItems;
  }
}
