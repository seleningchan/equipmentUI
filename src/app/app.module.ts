import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component'; 


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetailComponent,
    EquipmentsComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
