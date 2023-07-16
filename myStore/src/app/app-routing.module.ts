import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductsComponent, 
    children: [
    //     {path: 'new', component: DocumentEditComponent},
         {path: ':id', component: ProductDetailComponent}
    //     {path: ':id/edit', component: DocumentEditComponent}
    ]
    },
    {path: 'cart', component: CartComponent 
    // children: [
    //     {path: 'new', component: ContactEditComponent},
    //     {path: ':id', component: ContactDetailComponent},
    //     {path: ':id/edit', component: ContactEditComponent}
    // ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
}