import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavSearchComponent } from './components/top-nav-search/top-nav-search.component';
import { MainComponent } from './components/main/main.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { SafePipe } from './pipes/safe.pipe';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { NewsletterPopupComponent } from './components/newsletter-popup/newsletter-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavSearchComponent,
    MainComponent,
    SideNavComponent,
    BlogListComponent,
    BlogPostComponent,
    SafePipe,
    SearchResultsComponent,
    FooterComponent,
    NewsletterPopupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
