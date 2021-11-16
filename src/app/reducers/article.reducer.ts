import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/article.actions';
import { ArticleState } from '../states/app.states';
import * as fromAdapter from './article.adapter';

export const initialState: ArticleState = fromAdapter.adapter.getInitialState({ 
                              selectedArticleId: null
                        });
export function reducer(state = initialState, action: fromActions.ARTICLE_ACTIONS): ArticleState {
  switch(action.type) {
    case fromActions.ArticleActionTypes.ADD_ARTICLE: {
      return fromAdapter.adapter.addOne(action.payload.article, state);
    }
    case fromActions.ArticleActionTypes.ADD_ARTICLES: { 
      return fromAdapter.adapter.addMany(action.payload.articles, state);
    }
    case fromActions.ArticleActionTypes.UPDATE_ARTICLE: {
      return fromAdapter.adapter.updateOne(action.payload.article, state);
    }
    case fromActions.ArticleActionTypes.UPDATE_ARTICLES: {
      return fromAdapter.adapter.updateMany(action.payload.articles, state);
    }
    case fromActions.ArticleActionTypes.REMOVE_ARTICLE: {
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    }
    case fromActions.ArticleActionTypes.REMOVE_ARTICLES: {
      return fromAdapter.adapter.removeMany(action.payload.ids, state);
    }
    case fromActions.ArticleActionTypes.CLEAR_ARTICLES: {
      return fromAdapter.adapter.removeAll({ ...state, selectedArticleId: null });
    }
    case fromActions.ArticleActionTypes.LOAD_ALL_ARTICLES_SUCCESS: {
      return fromAdapter.adapter.addAll(action.payload.articles, state);
    }
    case fromActions.ArticleActionTypes.SELECT_ARTICLE: {
      return Object.assign({ ...state, selectedArticleId: action.payload.articleId });
    }     
    default: {
      return state;
    }
  }	
}

export const getSelectedArticleId = (state: ArticleState) => state.selectedArticleId;

export const getArticleState = createFeatureSelector<ArticleState>('articleState');

export const selectArticleIds = createSelector(getArticleState, fromAdapter.selectArticleIds);
export const selectArticleEntities = createSelector(getArticleState, fromAdapter.selectArticleEntities);
export const selectAllArticles = createSelector(getArticleState, fromAdapter.selectAllArticles);
export const articlesCount = createSelector(getArticleState, fromAdapter.articlesCount);

export const selectCurrentArticleId = createSelector(getArticleState, getSelectedArticleId);

export const selectCurrentArticle = createSelector(
  selectArticleEntities,
  selectCurrentArticleId,
  (articleEntities, articleId) => articleEntities[articleId]
); 