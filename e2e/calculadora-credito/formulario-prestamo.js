require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const ChromeDriver = require("../../test-utils/chrome-driver");

const URL =
  "https://www.metrocuadrado.com/calculadora-credito-hipotecario-vivienda/";

const QUERIES = {
  form: "//form[@name='MonthlyIncomeForm']",
  input: "//input[@id='ingresosMensuales']",
  dropdown: {
    opt5: "//option[@value='number:5']",
    opt10: "//option[@value='number:10']",
    opt15: "//option[@value='number:15']",
    opt20: "//option[@value='number:20']",
  },
  submit: "//button[@class='btn btn-upload credito']",
  table: "//table[@id='td-resul-calc']",
};

const VALUES = {
  input: { min: 737717, max: 999999999, valid: 1000000 },
};

describe("Test E2E Metrocuadrado - Formulario prestamo", function () {
  let browser;

  before(function () {
    const driver = new ChromeDriver();
    browser = driver.browser;
  });

  beforeEach(function (done) {
    browser.get(URL).then(function () {
      browser.sleep(2000).then(function () {
        done();
      });
    });
  });

  it("Debe recorrer el camino feliz", function (done) {
    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(VALUES.input.valid.toString())
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.dropdown.opt5))
          .click();
      })
      .then(function () {
        browser.findElement(By.xpath(QUERIES.form + QUERIES.submit)).click();
      })
      .then(function () {
        browser
          .wait(until.elementLocated(By.xpath(QUERIES.table)))
          .then(function () {
            expect(
              browser.findElement(By.xpath(QUERIES.table))
            ).to.eventually.exist;

            done();
          });
      });
  });

  it("Formulario deshabilitado si el input no tiene algun valor", function (done) {
    const inputValue = "";

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .getAttribute("value")
      .then(function (attr) {
        expect(attr).to.equal(inputValue);
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.equal("true");

            done();
          });
      });
  });

  it("Formulario deshabilitado si el input tiene el valor minimo -1", function (done) {
    const inputValue = (VALUES.input.min - 1).toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.equal(inputValue);
          });
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.equal("true");

            done();
          });
      });
  });

  it("Formulario habilitado si el input tiene el valor minimo", function (done) {
    const inputValue = VALUES.input.min.toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.equal(inputValue);
          });
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.be.null;

            done();
          });
      });
  });

  it("Formulario habilitado si el input tiene el valor minimo +1", function (done) {
    const inputValue = (VALUES.input.min + 1).toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.equal(inputValue);
          });
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.be.null;

            done();
          });
      });
  });

  it("Formulario habilitado si el input tiene el valor maximo -1", function (done) {
    const inputValue = (VALUES.input.max - 1).toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.equal(inputValue);
          });
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.be.null;

            done();
          });
      });
  });

  it("Formulario habilitado si el input tiene el valor maximo", function (done) {
    const inputValue = VALUES.input.max.toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.equal(inputValue);
          });
      })
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.submit))
          .getAttribute("disabled")
          .then(function (attr) {
            expect(attr).to.be.null;

            done();
          });
      });
  });

  it("Input solo permite agregar 9 digitos", function (done) {
    const inputValue = (VALUES.input.max + 1).toString();

    browser
      .findElement(By.xpath(QUERIES.form + QUERIES.input))
      .sendKeys(inputValue)
      .then(function () {
        browser
          .findElement(By.xpath(QUERIES.form + QUERIES.input))
          .getAttribute("value")
          .then(function (attr) {
            expect(attr).to.not.equal(inputValue);
            expect(attr.length).to.equal(9);

            done();
          });
      });
  });
});
