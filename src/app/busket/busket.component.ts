import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.css'],
})
export class BusketComponent implements OnInit {
  cardInfo: any[] = [];
  iconX = faX;
  iconPen = faPen;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  increase(item: any) {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    this.updateCartItemQuantity(updatedItem);
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      this.updateCartItemQuantity(updatedItem);
    }
  }
  deleteItem(item: any) {
    this.http
      .delete<any>(
        `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${item.product.id}`
      )
      .subscribe(
        () => {
          console.log(`Item ${item.product.id} deleted successfully`);
          // Remove item from local cardInfo array
          this.cardInfo = this.cardInfo.filter(
            (cartItem) => cartItem.product.id !== item.product.id
          );
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
  }

  updateCartItemQuantity(item: any) {
    const payload = {
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    };

    this.http
      .put<any>(
        'https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',
        payload
      )
      .subscribe(
        (response) => {
          const updatedCartItem = this.cardInfo.find(
            (cartItem) => cartItem.product.id === item.product.id
          );
          if (updatedCartItem) {
            updatedCartItem.quantity = item.quantity;
            updatedCartItem.product.total =
              response?.total ?? this.calculateTotal(updatedCartItem);
          }
        },
        (error) => {
          console.error('Error updating cart item:', error);
          if (error.status === 400) {
            console.error(
              'Bad Request: Check the payload structure and data types.',
              error.error
            );
          }
        }
      );
  }

  loadCartItems() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .subscribe(
        (data) => {
          this.cardInfo = this.groupAndSumQuantities(data);
        },
        (error) => {
          console.error('Error loading cart items:', error);
        }
      );
  }

  groupAndSumQuantities(array: any[]) {
    const groupedMap = new Map<number, any>();

    array.forEach((item) => {
      const productId = item.product.id;
      if (groupedMap.has(productId)) {
        groupedMap.get(productId).quantity += item.quantity;
      } else {
        groupedMap.set(productId, { ...item });
      }
    });

    return Array.from(groupedMap.values());
  }

  calculateTotal(item: any): number {
    return item.product.price * item.quantity;
  }
  calculateOverallTotal(): number {
    let total = 0;
    this.cardInfo.forEach((item) => {
      total += this.calculateTotal(item);
    });
    return total;
  }
}
