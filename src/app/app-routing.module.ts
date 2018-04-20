import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";

import { LoginComponent } from "./components/login/login.component";
import { LandingComponent } from "./components/landing/landing.components";
import { PageNotFound } from "./components/pageNotFound/pageNotFound.component"
import { SearchComponent } from "./components/search/search.component";
import { UserProfile } from "./components/user-profile/user-profile.component";
import { ModalComponent } from "./components/modal/modal.component";
import { CodingreviewComponent } from './components/codingreview_module/codingreview/codingreview.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "codingreview", component: CodingreviewComponent },

    { path: ":module", component: LandingComponent, children: [
        { path: ":workspace", component: SearchComponent },
        { path: ":workspace/user-profile", component: UserProfile }
    ] },
    { path: "**", component: PageNotFound }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    providers: [ AuthGuard ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
// , canActivate: [ AuthGuard ]