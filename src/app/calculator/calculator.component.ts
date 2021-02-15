import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  displayNumber: string = "0";
  smallDisplayNumber: string = "0";

  previousOperation: string = "";
  nextOperation: string = "";
  lastChar: any = "";

  newValue: number = 0;
  storedValue: number = 0;

  firstOp: boolean = true;
  operationBreak: boolean = true;

  calculate(value: string) {
    if ((!isNaN(this.lastChar)) && (this.lastChar != "")) {

      this.setValue();
      this.operationBreak = true;

      if (value === '=') {
        this.doOperation(this.newValue, this.nextOperation)

        if (this.newValue === 0 && this.nextOperation === "/") {
          this.displayNumber = "ERROR";
          this.clearSmallDisplay();
          this.changeSmallDisplay("ERROR", "operation");
        } else {
          this.displayNumber = this.storedValue.toString();
          this.changeSmallDisplay(" = " + this.storedValue, "operation");
        }
        this.nextOperation = value;

      } else {
        this.doOperation(this.newValue, this.nextOperation)

        if (this.nextOperation === "=") {
          this.clearSmallDisplay();
          this.smallDisplayNumber = this.displayNumber;
          this.previousOperation = this.displayNumber;
        }

        this.nextOperation = value;
        this.changeSmallDisplay(" " + this.nextOperation + " ", "operation");
      }
    }
  }

  doOperation(value: number, next: string) {
    if (this.firstOp === false) {
      if (this.nextOperation === '+') {
        this.storedValue = this.storedValue + this.newValue;
      } else if
        (this.nextOperation === '-') {
        this.storedValue = this.storedValue - this.newValue;
      } else if
        (this.nextOperation === '*') {
        this.storedValue = this.storedValue * this.newValue;
      } else if
        (this.nextOperation === '/') {
        this.storedValue = this.storedValue / this.newValue;
      }
    } else {
      this.storedValue = Number(this.displayNumber);
      this.firstOp = false;
    }
  }

  setValue() {
    this.newValue = Number(this.displayNumber.toString());
  }

  changeDisplay(value: number) {
    if (this.nextOperation === "=")
      this.ngOnInit();

    this.changeSmallDisplay(value.toString(), "value");

    if (this.operationBreak === true) {
      this.displayNumber = "";
      this.operationBreak = false;
    }

    this.displayNumber = this.displayNumber.toString() + value.toString();
  }

  changeSmallDisplay(thisOperation: string, newCharType: string) {
    if (this.nextOperation != "=")
      this.smallDisplayNumber = this.previousOperation + thisOperation;
    this.previousOperation = this.smallDisplayNumber;

    if (newCharType === "value") {
      this.lastChar = this.smallDisplayNumber.charAt(this.smallDisplayNumber.length - 1);
    } else if (newCharType === "operation") {
      this.lastChar = this.smallDisplayNumber.charAt(this.smallDisplayNumber.length - 2);
    }
  }

  clearSmallDisplay() {
    this.previousOperation = "";
    this.smallDisplayNumber = "";
  }

  addDot() {
    if ((!this.displayNumber.includes(".")) && (this.lastChar != "")) {
      this.displayNumber = this.displayNumber + ".";
      this.changeSmallDisplay(".", "value");
    }
  }

  allCLear() {
    this.displayNumber = "0";
    this.smallDisplayNumber = "0";

    this.previousOperation = "";
    this.nextOperation = "";
    this.lastChar = "";

    this.newValue = 0;
    this.storedValue = 0;

    this.firstOp = true;
    this.operationBreak = true;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.allCLear();
  }
}
