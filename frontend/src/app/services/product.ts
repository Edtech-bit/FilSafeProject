import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export interface Product {
  _id?: string;
  name: string;
  category: string;
  image: string;
  brochure: string;
  imageAlt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  
  // Create a subject to hold the products
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.getProducts().subscribe()) // Refresh list after add
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getProducts().subscribe()) // Refresh list after delete
    );
  }
}