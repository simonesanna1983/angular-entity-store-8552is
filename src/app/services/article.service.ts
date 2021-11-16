import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Article } from '../models/article';

@Injectable()
export class ArticleService {
    url = "/api/articles";
        
    constructor(private http: HttpClient) { }

    getAllArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.url);
    }
} 