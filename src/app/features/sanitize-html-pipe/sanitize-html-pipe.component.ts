import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHtml', pure: false,standalone: true})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(data:string): SafeHtml  | null{
    var result = ""
    if(data){
      result = this.escapeHTML(data);
    }
    return result;
  }


  
  
  
  
  public escapeHTML(str:string) {
    var escapeChars = [
      {code:'¢' , value:'cent'},
      {code:'£', value: 'pound'},
      {code:'¥', value: 'yen'},
      {code:'€', value: 'euro'},
      {code:'©', value: 'copy'},
      {code:'®', value: 'reg'},
      {code:'<', value: 'lt'},
      {code:'>', value: 'gt'},
      {code:'"', value: 'quot'},
      {code:'&', value: 'amp'},      
      
    ];
    var regexString = '[';
  for(var key of escapeChars) {
    regexString += key.code;
  }
  regexString += ']';
  
  var regex = new RegExp( regexString, 'g');
    return str.replace(regex, function(m) {
      return '&' + escapeChars.find(x => x.code === m)?.value + ';';
    });
  };
}
