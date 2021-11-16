import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity/src/models'; 
import { Article } from '../models/article';

export enum ArticleActionTypes {
  ADD_ARTICLE = '[ARTICLE] Add Article',
  ADD_ARTICLES = '[ARTICLE] Add Articles',
  UPDATE_ARTICLE = '[ARTICLE] Update Article',
  UPDATE_ARTICLES = '[ARTICLE] Update Articles',
  REMOVE_ARTICLE = '[ARTICLE] Remove Article',
  REMOVE_ARTICLES = '[ARTICLE] Remove Articles',
  CLEAR_ARTICLES = '[ARTICLE] Clear Articles',
  LOAD_ALL_ARTICLES = '[ARTICLE] Load All Articles',
  LOAD_ALL_ARTICLES_SUCCESS = '[ARTICLE] Load All Articles Success',
  SELECT_ARTICLE = '[ARTICLE] Article By Id'
}

export class AddArticle implements Action { 
  readonly type = ArticleActionTypes.ADD_ARTICLE;
  constructor(public payload: { article: Article }) {}
}
export class AddArticles implements Action {
  readonly type = ArticleActionTypes.ADD_ARTICLES;
  constructor(public payload: { articles: Article[] }) {}
}
export class UpdateArticle implements Action {
  readonly type = ArticleActionTypes.UPDATE_ARTICLE;
  constructor(public payload: { article: Update<Article> }) {}
}
export class UpdateArticles implements Action {
  readonly type = ArticleActionTypes.UPDATE_ARTICLES;
  constructor(public payload: { articles: Update<Article>[] }) {}
}
export class RemoveArticle implements Action {
  readonly type = ArticleActionTypes.REMOVE_ARTICLE;
  constructor(public payload: { id: string }) {}
}
export class RemoveArticles implements Action {
  readonly type = ArticleActionTypes.REMOVE_ARTICLES;
  constructor(public payload: { ids: string[] }) {}
}
export class ClearArticles implements Action {
  readonly type = ArticleActionTypes.CLEAR_ARTICLES;
}
export class LoadArticles implements Action {
  readonly type = ArticleActionTypes.LOAD_ALL_ARTICLES;
}
export class LoadArticlesSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_ALL_ARTICLES_SUCCESS;
  constructor(public payload: { articles: Article[] }) {}
}
export class SelectArticle implements Action {
  readonly type = ArticleActionTypes.SELECT_ARTICLE;
  constructor(public payload: { articleId: string }) {}
}
export type ARTICLE_ACTIONS = AddArticle | AddArticles
                         | UpdateArticle | UpdateArticles
                         | RemoveArticle | RemoveArticles
                         | ClearArticles | LoadArticlesSuccess
                         | SelectArticle; 