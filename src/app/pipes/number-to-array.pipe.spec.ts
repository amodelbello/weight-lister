import { NumberToArrayPipe } from './number-to-array.pipe';

describe('NumberToArrayPipe', () => {
  let pipe: NumberToArrayPipe = null;

  beforeEach(() => {
    pipe = new NumberToArrayPipe();
  });

  afterEach(() => {
    pipe = null;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should take a number and return an array with that amount of elements whose values increment from 1', () => {
    const testNumber = 8;
    const expectedResult = [1,2,3,4,5,6,7,8];
    let returnedArray = pipe.transform(testNumber);

    expect(returnedArray).toEqual(expectedResult);
  });

  it('should return an empty array if input is not a number', () => {
    const expectedResult = [];
    let returnedArray = [];

    returnedArray = pipe.transform('hello');
    expect(returnedArray).toEqual(expectedResult);

    returnedArray = pipe.transform(['hello']);
    expect(returnedArray).toEqual(expectedResult);

    returnedArray = pipe.transform(true);
    expect(returnedArray).toEqual(expectedResult);
  });

  it('should work even when input number is negative', () => {
    const testNumber = -8;
    const expectedResult = [1,2,3,4,5,6,7,8];
    let returnedArray = pipe.transform(testNumber);

    expect(returnedArray).toEqual(expectedResult);
  });
});
