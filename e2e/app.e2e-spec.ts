import { Ng2LynxPage } from './app.po';

describe('ng2-lynx App', function() {
  let page: Ng2LynxPage;

  beforeEach(() => {
    page = new Ng2LynxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
