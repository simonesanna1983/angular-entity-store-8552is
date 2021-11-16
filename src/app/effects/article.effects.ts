import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as fromActions from '../actions/article.actions';
import { ArticleService } from '../services/article.service';

@Injectable()
export class ArticleEffects {

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}      

  @Effect() 
  loadAllArticles$: Observable<Action> = this.actions$
    .ofType(fromActions.ArticleActionTypes.LOAD_ALL_ARTICLES)
    .switchMap(() => 
       this.articleService.getAllArticles()
       .map(data => new fromActions.LoadArticlesSuccess({ articles: data })) 
    );
} 