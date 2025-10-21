import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-qr-form',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeModule, HttpClientModule],
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.css']
})
export class QrFormComponent {
  name = '';
  contact = '';
  // qrData = '';
  qrImageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  generateQR() {
    const payload = {
      name: this.name,
      contact: this.contact
    };

    // Problem: before the first ":" need to have at least 2 word like "Full Name:", "Your Name:". //Error: "Name:" (One word)

    //this.qrData = `Name: ${this.name}, Contact: ${this.contact}`; //no working
    //this.qrData = `Your Name: ${this.name}, Contact: ${this.contact}`;  //working
    //this.qrData = `YourName: ${this.name}, Contact: ${this.contact}`;  //no working

    //this.qrData = `Full Name: ${this.name}, Contact: ${this.contact}`;  //working
    //this.qrData = `FullName: ${this.name}, Contact: ${this.contact}`;  //no working
    //this.qrData = `Full Name: ${this.name}\nContact Number: ${this.contact}`; //working

    // Testing example
    //this.qrData = 'https://www.google.com';  //working
    //this.qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${this.name}\nTEL:${this.contact}\nEND:VCARD`; //working
    //this.qrData= `Name is ${this.name}\nContact is ${this.contact}`; //working

    console.log('QR Data:\n', payload);

    // Send full vCard string to backend
    this.http.post('http://localhost:8000/generate-qr', payload, { responseType: 'blob' })
      .subscribe(blob => {
        this.qrImageUrl = URL.createObjectURL(blob);
      }, error => {
        console.error('Error generating QR code from backend:', error);
      });
  }

  downloadQR() {
    if (this.qrImageUrl) {
      const link = document.createElement('a');
      link.href = this.qrImageUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  }
}
