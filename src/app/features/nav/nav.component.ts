import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  title = input<string>("")
  selected = input<string>("");
  navigate= output<string>();
  fillView = input<boolean>(false)
  public search:string = "";
  links =  input<Array<Links>>( [
    {name:"First",link:"first"},
    {name:"Second",link:"second"},        
  ])

  public filteredLinks():any {
    return this.links().filter(x => x.name.toLowerCase().includes(this.search.toLowerCase()) );
  }
}

export class Links{
  public name:string = "";
  public link:string = "";
}