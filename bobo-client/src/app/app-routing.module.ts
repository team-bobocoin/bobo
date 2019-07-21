import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'helpee-tabs', loadChildren: './helpee-tabs/helpee-tabs.module#HelpeeTabsPageModule'},
    // {path: 'helpee', loadChildren: './tab1/helpee/helpee.module#HelpeeModule'},
    {path: 'sponsorhelpee', loadChildren: './tab2/sponsor-list/sponsorhelpee/sponsorhelpee.module#SponsorHelpeeModule'},
    // {path: 'donate', loadChildren: './tab1/helpee/donate/donate.module#DonateModule'},
    {path: 'sponsor-list', loadChildren: './tab2/sponsor-list/sponsor_list.module#SponsorListModule'},
    {path: 'signin', loadChildren: './signin/signin.module#SigninPageModule'},
    {path: 'signup', loadChildren: './signup/signup.module#SignupPageModule'},
    {path: 'daily', loadChildren: './market/daily/daily.module#ProductsPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
