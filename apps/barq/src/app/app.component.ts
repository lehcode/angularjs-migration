import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoginComponent],
  template: `
    <div class="app-container">
      <!-- AngularJS router outlet -->
      <div ui-view></div>
      <!-- Angular router outlet -->
      <router-outlet></router-outlet>
      <app-login></app-login>
    </div>
  `,
})
export class AppComponent {
  title = 'barq';
}
