import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  mostrar: boolean = true;
  interval: any;


  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    this.mostrar = true;
    this.interval = setInterval(() => {
      if (this.mostrar == true) {
        this.mostrar = false;
        this.pauseTimeLine();
      }
      console.log("Adsa")
    }, 1000);
  }
  pauseTimeLine() {
    clearInterval(this.interval);
  }


}
