import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() categoryId: number | undefined;
  faChart = faChartSimple;
  cardInfo: any[] = [];
  originalCardInfo: any[] = [];
  selectedSpiciness: number = 0;
  noNutsChecked: boolean = false;
  vegeterianChecked: boolean = false;
  value: any;
  cartItems: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] && !changes['categoryId'].firstChange) {
      this.fetchCards();
    }
  }

  fetchCards(): void {
    let url = 'https://restaurant.stepprojects.ge/api/Products/GetAll';
    if (this.categoryId !== undefined) {
      url = `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${this.categoryId}`;
    }

    this.http
      .get<any[]>(url)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error.message);
          console.log('Error URL:', url);
          return throwError(error);
        })
      )
      .subscribe((data: any) => {
        this.originalCardInfo =
          this.categoryId !== undefined ? data.products : data;
        this.cardInfo = [...this.originalCardInfo];
      });
  }

  isNutsChecked(item: { id: any; nuts: any }): boolean {
    return this.cardInfo.some((card) => card.id === item.id && card.nuts);
  }

  isVegeterianChecked(item: { id: any; vegeterian: any }): boolean {
    return this.cardInfo.some((card) => card.id === item.id && card.vegeterian);
  }

  resetFilter(): void {
    this.selectedSpiciness = 0;
    this.cardInfo = [...this.originalCardInfo];
    this.applyFilter();
  }

  applyFilter(): void {
    this.cardInfo = this.originalCardInfo.filter((card) => {
      let meetsCriteria = true;
      if (this.selectedSpiciness !== 0) {
        meetsCriteria = card.spiciness === this.selectedSpiciness;
      }
      if (meetsCriteria && this.noNutsChecked) {
        meetsCriteria = !card.nuts;
      }
      if (meetsCriteria && this.vegeterianChecked) {
        meetsCriteria = card.vegeterian;
      }
      return meetsCriteria;
    });
  }

  fetchCartContents(): void {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .pipe(
        catchError((error) => {
          console.error('Error fetching cart contents:', error);
          return throwError(error);
        })
      )
      .subscribe((data: any[]) => {
        this.cartItems = data.map((cartItem) => ({
          image: cartItem.product.image,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          name: cartItem.product.name,
        }));
        console.log('Cart contents:', this.cartItems);
      });
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);
    const cartItem = {
      productId: item.id,
      quantity: 1,
      price: item.price,
    };
    this.http
      .post(
        'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket',
        cartItem
      )
      .subscribe((data: any) => {});
  }
}
