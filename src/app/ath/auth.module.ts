import {NgModule} from "@angular/core";
import {AthComponent} from "./ath.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [AthComponent],
  imports: [
    SharedModule, CommonModule, FormsModule, RouterModule.forChild(  [{path: '', component: AthComponent}])
  ]
})

export class AuthModule {}
