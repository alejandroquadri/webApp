import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


// import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
// import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
// import { ListErrorsComponent } from './list-errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // ArticleListComponent,
    // ArticleMetaComponent,
    // ArticlePreviewComponent,
    // FavoriteButtonComponent,
    // FollowButtonComponent,
    // ListErrorsComponent,
  ]
})
export class SharedModule {}
