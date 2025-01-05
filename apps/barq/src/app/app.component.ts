import { Component } from '@angular/core';
import { LoginComponent } from './components/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <!-- Hybrid app template -->
    <div class="app-container">
      <!-- AngularJS router outlet -->
      <div ui-view></div>
      <app-login></app-login>
    </div>
  `,
})
export class AppComponent {
  title = 'barq';
}
