import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitleCasePipe implements PipeTransform {

  noCapWords: Array<string> = [
    'a',
    'along',
    'an',
    'and',
    'at',
    'but',
    'by',
    'for',
    'from',
    'in',
    'near',
    'nor',
    'of',
    'on',
    'or',
    'over',
    'the',
    'to',
    'under',
    'upon',
    'with',
    'without'
  ];

  transform(value: string, applyToAll: boolean = false): string {
    let transformedString: string = value.replace(/\w\S*/g, (word) => {

      let tranformedWord: string = '';
      if (!applyToAll && this.noCapWords.includes(word.toLowerCase())) {
        tranformedWord = word.toLowerCase();
      } else {
        tranformedWord = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }

      return tranformedWord;
    });

    // Capitalize first letter of first word no matter what
    transformedString = transformedString.charAt(0).toUpperCase() + transformedString.slice(1);

    return transformedString;
  }

}
