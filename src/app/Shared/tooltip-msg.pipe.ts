import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tooltipMsg'
})
export class TooltipMsgPipe extends DatePipe implements PipeTransform {
  transform(value:string,modifiedBy:string,createdBy:string='',createdDate:string=''): any {
    let toolTipString:string='';
    let date =super.transform(value, 'dd-MMM-yyyy h:mm a');
    let recDate=super.transform(createdDate,'dd-MMM-yyyy h:mm a');
    if(createdBy){
      toolTipString+=`Created by ${createdBy}\n`;
    }
    if(recDate){
      toolTipString+=`Created date ${recDate}\n`;
    }
    if(modifiedBy){
      toolTipString+=`Last modified by ${modifiedBy}\n`;
    }
    if(date){
    toolTipString+=`Last modified date ${date}`;
    }   
    return toolTipString;
  }
} 
