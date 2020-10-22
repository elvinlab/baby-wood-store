import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/global/home/home.component';
import { HeaderTopComponent } from './components/global/header-top/header-top.component';
import { SliderCarouselComponent } from './components/global/slider-carousel/slider-carousel.component';
import { LeftSidebarComponent } from './components/global/left-sidebar/left-sidebar.component';
import { FeaturesItemsComponent } from './components/global/features-items/features-items.component';
import { HeaderMiddleComponent } from './components/global/header-middle/header-middle.component';
import { HeaderBottomComponent } from './components/global/header-bottom/header-bottom.component';
import { CategoryTabComponent } from './components/global/category-tab/category-tab.component';
import { RecommendedItemsComponent } from './components/global/recommended-items/recommended-items.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { LoginClientComponent } from './components/client/login-client/login-client.component';
import { RegisterClientComponent } from './components/client/register-client/register-client.component';
import { ChangePasswordComponent } from './components/global/change-password/change-password.component';
import { ChangePasswordRequestComponent } from './components/global/change-password-request/change-password-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministratorComponent } from './components/administrator/administrator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderTopComponent,
    SliderCarouselComponent,
    LeftSidebarComponent,
    FeaturesItemsComponent,
    HeaderMiddleComponent,
    HeaderBottomComponent,
    CategoryTabComponent,
    RecommendedItemsComponent,
    FooterComponent,
    LoginClientComponent,
    RegisterClientComponent,
    ChangePasswordComponent,
    ChangePasswordRequestComponent,
    AdministratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('720440306234-5ia17427jclhgsa6rl76dn9gbf531iuo.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1539316096273791'),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
