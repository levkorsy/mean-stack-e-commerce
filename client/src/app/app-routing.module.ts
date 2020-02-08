import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/main/dashboard/dashboard.component";
import { RegistrationComponent } from "./components/users/registration/registration.component";
import { ShopDashbordComponent } from "./components/products_order/shop-dashbord/shop-dashbord.component";
import { HeaderComponent } from "./components/main/header/header.component";
import { LoginpageComponent } from "./components/auth/loginpage/loginpage.component";
import { OrderDashbordComponent } from "./components/products_order/order-dashbord/order-dashbord.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  { path: "registration", component: RegistrationComponent },
  {
    path: "shoping",
    component: ShopDashbordComponent,
    canActivate: [AuthGuardService]
  },
  { path: "login", component: LoginpageComponent },
  {
    path: "order",
    component: OrderDashbordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService, AdminGuardService]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  { path: "", component: LoginpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
