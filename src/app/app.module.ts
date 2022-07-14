import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Remult } from 'remult';
import { AuthService } from './AuthService';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
         tokenGetter: () => AuthService.fromStorage()
      }
   })
  ],
  providers: [
    { provide: Remult, useClass: Remult, deps: [HttpClient] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
