import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appInputValue]',
    host: {
    '(click)': 'click()'
    }
})
export class  InputValueDirective {

  // private element: HTMLElement;

  constructor(
    element: ElementRef
   ) {
    console.log('directive running');
    // this.element = element.nativeElement;
  }

  callme() {
     console.log('hi from directive');
     // this.element.nativeElement.value = '';
  }
}

// import {Directive, ElementRef} from '@angular/core';

// @Directive({
//     selector:   '[someDirective]',
//     host{
//     '(click)':"click()"
//     }
// })
// export class  SomeDirective{   
  
//     private element: HTMLElement;
  
//     constructor(
//         element: ElementRef
//       ) {
//       console.log('directive running');
//       this.element = element.nativeElement;
      
//     }    
    
//     callme() {
//        console.log('hi from directive ');
//        this.element.value = "Johnny Bravo";
//     }
// }


// import { Directive, ElementRef } from '@angular/core';

// @Directive({
//   selector: '[appboldHover]',
//   host: {
//     '(mouseenter)': 'onMouseEnter()',
//     '(mouseleave)': 'onMouseLeave()'
//   }
// })
// export class BoldHoverDirective {
//   private element: HTMLElement;

//   constructor(element: ElementRef) {
//     this.element = element.nativeElement;
//   }

//   onMouseEnter() {
//     this.element.style.fontWeight = 'bold';
//   }
//   onMouseLeave() {
//     this.element.style.fontWeight = 'normal';
//   }
// }
