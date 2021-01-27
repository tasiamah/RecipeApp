import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./ath/auth-interceptor.service";

@NgModule({
  providers: [ {
  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
}]
})

export class CoreModule { }
