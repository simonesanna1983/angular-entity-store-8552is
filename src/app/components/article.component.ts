import { Component, OnInit } from '@angular/core';    
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromReducer from '../reducers/article.reducer';
import * as fromActions from '../actions/article.actions';
import { ArticleState } from '../states/app.states';
import { Article } from '../models/article';

@Component({
	selector: 'app-article',
	templateUrl: 'article.component.html'
})
export class ArticleComponent implements OnInit {
	allArticles$: Observable<Article[]>
	articleById$: Observable<Article>
	count$: Observable<number>
	articleIds$: Observable<string[] | number[]>
	task= '';
	articleId: string;
	articleForm: FormGroup;

	constructor(
		   private formBuilder:FormBuilder,
		   private store: Store<ArticleState>) {
	}
	ngOnInit() {
		this.count$ = this.store.select(fromReducer.articlesCount);
		this.allArticles$ = this.store.select(fromReducer.selectAllArticles);
		this.articleIds$ = this.store.select(fromReducer.selectArticleIds);
		this.articleById$ = this.store.select(fromReducer.selectCurrentArticle);

		this.store.dispatch(new fromActions.LoadArticles());
	}
	createBlankArticleForm() {
		this.articleForm = this.formBuilder.group({
			articlesArray: this.formBuilder.array([]) 
		});
	}
	createArticleFormForAdd() {
		this.createBlankArticleForm();
		this.addMoreControlForAdd();
	}
	get articlesFormArray(): FormArray{
		return this.articleForm.get('articlesArray') as FormArray;
	}
	addMoreControlForAdd() {
		let ag = this.formBuilder.group(new Article());
		this.articlesFormArray.push(ag);	  
	}	
	updateArticleForm() {
		this.createBlankArticleForm();
		this.allArticles$.subscribe(articles => {
			if(articles && articles.length > 0) {
				let article = articles[0];
				let ag = this.formBuilder.group(article);
				this.articlesFormArray.push(ag);       
		        }  
    	        });
	}	
	addMoreControlForUpdate() {
		this.allArticles$.subscribe(articles => {
			if(articles && articles.length > 0 && this.articlesFormArray.length < articles.length) {
				let len = this.articlesFormArray.length;
				let article = articles[len];
				let ag = this.formBuilder.group(article);
				this.articlesFormArray.push(ag);       
		        }  
    	        });			  
	}		
	deleteFormArrayControl(idx: number) {
		this.articlesFormArray.removeAt(idx);
	}
	addArticleView() { 
		this.task = 'add';
		this.createArticleFormForAdd();
	}
	updateArticleView() { 
		this.task = 'update';
		this.updateArticleForm();
	}	
	removeArticleView() { 
		this.task = 'remove';
		this.createBlankArticleForm();
		this.allArticles$.subscribe(articles => {
			this.createBlankArticleForm();
			articles.forEach(article => {
				let ag = this.formBuilder.group({
					articleData: article,
					chk: false
				});
				this.articlesFormArray.push(ag);
			});
    	        });
	}	
	articleByIdView() { 
		this.task = 'select';
	}		
	onFormSubmitForAdd() {
                if (this.articlesFormArray.length === 1) {
		   this.addArticle(this.articlesFormArray.at(0).value); 
		} else if (this.articlesFormArray.length > 1) {
		   this.addArticles(this.articlesFormArray.value); 
		}
		this.createBlankArticleForm();
		this.loadAllArticles();
	}
	onFormSubmitForUpdate() {
                if (this.articlesFormArray.length === 1) {
		   this.updateArticle(this.articlesFormArray.at(0).value); 
		} else if (this.articlesFormArray.length > 1) {
		   this.updateArticles(this.articlesFormArray.value); 
		}
		this.createBlankArticleForm();
		this.loadAllArticles();
	}	 
	onFormSubmitForRemove() {  
		let articleIdsToDelete: string[] = [];
		this.articlesFormArray.controls.forEach(result => {
			if (result.get('chk').value) { 
				articleIdsToDelete.push(result.get('articleData').value.id);
			}
		});
		if (articleIdsToDelete.length == 1) {
                     this.removeArticle(articleIdsToDelete[0]);
		} else if (articleIdsToDelete.length > 1 ) {
                     this.removeArticles(articleIdsToDelete);
		}
	}
	addArticle(data: Article) {
		this.store.dispatch(new fromActions.AddArticle({ article: data }));
	}
	addArticles(data: Article[]) {
		this.store.dispatch(new fromActions.AddArticles({ articles: data }));
	}	
	updateArticle(data: Article) {
		this.store.dispatch(new fromActions.UpdateArticle({ article: {id: data.id, changes: data}}));
	}
	updateArticles(data: Article[]) {
		let allUpdates = data.map(article => Object.assign({}, {id: article.id, changes: article}));
		this.store.dispatch(new fromActions.UpdateArticles({ articles: allUpdates }));
	}	
	removeArticle(articleId: string) {
		this.store.dispatch(new fromActions.RemoveArticle({ id: articleId }));
	}
	removeArticles(articleIds: string[]) {
		this.store.dispatch(new fromActions.RemoveArticles({ ids: articleIds }));
	}	
	clearAllArticles() {
		this.store.dispatch(new fromActions.ClearArticles());
	}				
	loadAllArticles() {
		this.task = 'all';
	}	
	selectArticleById() {
		this.store.dispatch(new fromActions.SelectArticle({ articleId: this.articleId }));
	}
} 