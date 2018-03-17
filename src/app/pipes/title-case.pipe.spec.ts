import { TitleCasePipe } from './title-case.pipe';

describe('CapitalCasePipe', () => {
  it('create an instance', () => {
    const pipe = new TitleCasePipe();
    expect(pipe).toBeTruthy();
  });
});
