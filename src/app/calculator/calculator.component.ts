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

  operation: Array<string> = [""];
  operationNumber: number = 0;

  newValue: number = 0;
  storedValue: number = 0;

  firstOp: boolean = true;
  operationEnded: boolean = false;
  operationBreak: boolean = true;


  calculate(value: string) {
    if ((!isNaN(this.lastChar)) && (this.lastChar != "")) {
      this.operationEnded = false;
      this.setValue();
      this.operationBreak = true;

      if (value === '=') {
        this.doOperation(this.newValue, value)
        this.operationEnded = true;

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
        this.doOperation(this.newValue, value)

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
    if (next === "=") {
      this.operation.push(value.toString())

      while (this.operation.includes("*") || this.operation.includes("/")) {
        for (let i = 1; i <= this.operation.length; i++) {
          if (this.operation[i] === "*") {

            this.operationNumber = Number(this.operation[i - 1]) * Number(this.operation[i + 1])
            this.operation.splice(i - 1, 3, this.operationNumber.toString())
            break;

          } else if (this.operation[i] === "/") {

            this.operationNumber = Number(this.operation[i - 1]) / Number(this.operation[i + 1])
            this.operation.splice(i - 1, 3, this.operationNumber.toString())
            break;

          }
        }
      }

      while (this.operation.includes("+") || this.operation.includes("-")) {
        for (let i = 1; i <= this.operation.length; i++) {
          if (this.operation[i] === "+") {

            this.operationNumber = Number(this.operation[i - 1]) + Number(this.operation[i + 1])
            this.operation.splice(i - 1, 3, this.operationNumber.toString())
            break;

          } else if (this.operation[i] === "-") {

            this.operationNumber = Number(this.operation[i - 1]) - Number(this.operation[i + 1])
            this.operation.splice(i - 1, 3, this.operationNumber.toString())
            break;

          }
        }
      }
      this.storedValue = Number(this.operation[0])
    }
    else if (this.firstOp) {
      this.firstOp = false;
      this.operation.splice(0, 1, value.toString(), next)
    } else
      if (!this.operationEnded)
        this.operation.splice(0, 1, value.toString(), next);
      else
        this.operation.push(value.toString(), next);
  }


  setValue() {
    this.newValue = Number(this.displayNumber.toString());
    this.operationEnded = false;
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

    if (this.operationEnded === true){
      this.lastChar = this.operation[this.operation.length - 1];
    }
    else if (newCharType === "value") {
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

    this.operation = [""];
    this.operationNumber = 0;

    this.newValue = 0;
    this.storedValue = 0;

    this.firstOp = true;
    this.operationEnded = false;
    this.operationBreak = true;
  }


  constructor() {
  }


  ngOnInit(): void {
    this.allCLear();
  }
}
