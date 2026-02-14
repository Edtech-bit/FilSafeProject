import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  _id?: string;
  title: string;
  shortDescription: string;
  content: string;
  image: string;
  imageAlt?: string;
  date?: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  // FIXED: Added /api/blogs to the production URL
  private readonly productionUrl = 'https://filsafeproject-2.onrender.com/api/blogs';
  private readonly localUrl = 'http://localhost:3000/api/blogs';

  private apiUrl = isDevMode() ? this.localUrl : this.productionUrl;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getPostById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  addPost(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  updatePost(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}