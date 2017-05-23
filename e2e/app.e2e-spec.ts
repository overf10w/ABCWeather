import { AbcweatherPage } from './app.po';

describe('abcweather App', () => {
  let page: AbcweatherPage;

  beforeEach(() => {
    page = new AbcweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
