import { Article } from '../models/article';
import { EntityState } from '@ngrx/entity';
export interface AppState {
	articleState: ArticleState;
}

export interface ArticleState extends EntityState<Article> {
	selectedArticleId: string | number | null;
} 