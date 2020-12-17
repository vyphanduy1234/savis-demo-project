import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AddComponent } from './components/add/add.component';
import { HomeComponent } from './components/home/home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DvItemComponent } from './components/dv-item/dv-item.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    AddComponent,
    HomeComponent,
    DvItemComponent,
  ],
  imports: [
    BrowserModule,
    NzModalModule,
    AppRoutingModule,
    NzCardModule,
    NzSpinModule,
    FormsModule,
    NzInputModule,
    NzMessageModule,
    NzCheckboxModule,
    HttpClientModule,
    NzAlertModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
