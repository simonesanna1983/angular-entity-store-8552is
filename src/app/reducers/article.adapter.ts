import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Article } from '../models/article';

export function sortByCategory(ob1: Article, ob2: Article): number {
   return ob1.category.localeCompare(ob2.category);
}
  
export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>({
   sortComparer: sortByCategory
});
  
export const {
   selectIds: selectArticleIds,
   selectEntities: selectArticleEntities,
   selectAll: selectAllArticles,
   selectTotal: articlesCount
} = adapter.getSelectors(); 