import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  let pipe: TitleCasePipe = null;

  beforeEach(() => {
    pipe = new TitleCasePipe();
  });

  afterEach(() => {
    pipe = null;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it ('should take a string and convert it to title case', () => {
    const testStrng = "and this is a test string to convert to title case";
    const transformedString = pipe.transform(testStrng);
    const expectedResult = 'And This Is a Test String to Convert to Title Case';

    expect(transformedString).toBe(expectedResult);
  });

  it ('should take a string and apply capital case to all words', () => {
    const testStrng = "and this is a test string to convert to title case";
    const transformedString = pipe.transform(testStrng, true);
    const expectedResult = 'And This Is A Test String To Convert To Title Case';

    expect(transformedString).toBe(expectedResult);
  });
});
