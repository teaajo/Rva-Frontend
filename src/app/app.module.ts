import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { PreduzeceDialogComponent } from './components/dialogs/preduzece-dialog/preduzece-dialog.component';
import { ObrazovanjeDialogComponent } from './components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { SektorDialogComponent } from './components/dialogs/sektor-dialog/sektor-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RadnikDialogComponent } from './components/dialogs/radnik-dialog/radnik-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    RadnikComponent,
    ObrazovanjeComponent,
    SektorComponent,
    PreduzeceComponent,
    PreduzeceDialogComponent,
    ObrazovanjeDialogComponent,
    SektorDialogComponent,
    RadnikDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
