import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('SportApps App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the login', () => {
    page.navigateTo();
    browser.driver.sleep(1000);
    expect(page.getTitleText()).toEqual('Login');
  });

  it('should register successfully', () => {

    page.navigateTo();
    browser.driver.sleep(1000);
    page.getLinkRegister().click();
    browser.driver.sleep(1000);

    const email = page.getInputEmail();
    const password = page.getInputPassword();

    const btnRegister = page.getBtnRegister();
    const random = Math.random() * 1000;
    email.sendKeys('newuser' + random + '@user.com');
    browser.driver.sleep(1000);
    password.sendKeys('123456');
    browser.driver.sleep(1000);
    btnRegister.click();
    browser.driver.sleep(2000);
    expect(page.getTitlePlan()).toEqual('Plan de Subscripción');
    page.getBtnLogout().click();
  });


  it('should login successfully', () => {

    page.navigateTo();
    browser.driver.sleep(1000);
    const email = page.getInputEmail();
    const password = page.getInputPassword();

    const btnLogin = page.getBtnlogin();

    email.sendKeys('luis@user.com');
    password.sendKeys('123456');
    btnLogin.click();
    browser.driver.sleep(2000);
    expect(page.getTitlePlan()).toEqual('Plan de Subscripción');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
