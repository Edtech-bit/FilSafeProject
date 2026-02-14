import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';

export interface Product {
  _id?: string;
  name: string;
  category: string;
  image: string;
  brochure: string;
  imageAlt: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // FIXED: Added /api/products to the production URL
  private readonly productionUrl = 'https://filsafeproject-2.onrender.com/api/products';
  private readonly localUrl = 'http://localhost:3000/api/products';

  private apiUrl = isDevMode() ? this.localUrl : this.productionUrl;
  
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.getProducts().subscribe())
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(() => this.getProducts().subscribe())
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getProducts().subscribe())
    );
  }
}