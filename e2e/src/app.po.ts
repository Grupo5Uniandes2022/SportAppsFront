import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(uri: string = '') {
    return browser.get(browser.baseUrl + uri) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('login-title')).getText() as Promise<string>;
  }

  getInputEmail() {
    return element(by.id('email'));
  }

  getInputPassword() {
    return element(by.id('password'));
  }

  getBtnlogin() {
    return element(by.id('btn_login'));
  }

  getLinkRegister() {
    return element(by.id('link_register'));
  }

  getBtnRegister() {
    return element(by.id('btn_register'));
  }

  getBtnLogout() {
    return element(by.id('btn_logout'));
  }

  getTitlePlan() {
    return element(by.id('title_plan')).getText() as Promise<string>;
  }
}
