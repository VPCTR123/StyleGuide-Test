import { CommonModule } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import hljs, {HLJSApi } from 'highlight.js';


@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss'
})
export class SampleComponent implements OnInit {
  
  public showHtml:boolean = true;

  ngOnInit() {
    this.highlight()
  }
  
  public highlight(){
    setTimeout(() =>{hljs.highlightAll()}, 100);
    
  }

  public copyTextToClipboard(elementId: string) {
    const divElement = document.querySelector(elementId);
    if (divElement) {
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'text');
        hiddenInput.value = divElement.innerHTML;
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        if(!navigator.clipboard){
          document.execCommand('copy');
        }else{
          navigator.clipboard.writeText(divElement.innerHTML)
        }
        document.body.removeChild(hiddenInput);
    }
  }
}
