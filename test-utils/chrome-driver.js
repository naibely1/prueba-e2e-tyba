const webdriver = require("selenium-webdriver");

module.exports = class ChromeBrowser {
  constructor() {
    if (ChromeBrowser._instance) {
      return ChromeBrowser._instance;
    }
    ChromeBrowser._instance = this;

    this.browser = new webdriver.Builder().forBrowser("chrome").build();
    this.browser.manage().window().maximize();
  }
};
