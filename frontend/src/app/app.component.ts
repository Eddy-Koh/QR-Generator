import { Component } from '@angular/core';
import { QrFormComponent } from './qr-form/qr-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QrFormComponent],
  template: `<app-qr-form></app-qr-form>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QR Generator';
}
