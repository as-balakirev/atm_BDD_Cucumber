const {browser} = require("protractor");
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const EC = protractor.ExpectedConditions;
setDefaultTimeout(60000);

When(/^I open "([^"]*)" url$/, async function(url) {
    await browser.get(url);
});

Then(/^"([^"]*)" page is opened$/, async function(page) {
    const pageURL = await browser.getCurrentUrl();
    expect(pageURL).to.be.equal(`https://www.epam.com/${page.toLowerCase().split(' ').join('-')}`);
});

When(/^I click "([^"]*)" menu$/, function (menu) {
    let menuItem = element(by.xpath(`//a[text()='${menu}'][ancestor::*[contains(@class,'top-navigation__item')]]`));
    return menuItem.click();
});

When(/^I wait "([^"]*)" seconds$/, function (secondsToSleep) {
    return browser.sleep(secondsToSleep * 1000);
});

When(/^I populate "([^"]*)" in "Job Input" field$/, async function(keyword) {
    let fieldElement = element(by.xpath('//input[contains(@class, \'recruiting-search__input\')]'));
    await fieldElement.sendKeys(`${keyword}`);
});

When(/^I select "([^"]*)" location in "Location" dropdown$/, async function(locationValue) {
    let learnMoreButton = element(by.xpath('(//a[descendant::*[contains(text(), \'Learn more\')]][ancestor::div[contains(@class, \'button\')]])[1]'));
    let locationArrow = element(by.xpath('//span[@class="select2-selection__arrow"]'));
    await browser.executeScript('arguments[0].scrollIntoView()', learnMoreButton);
    await locationArrow.click();
    await browser.sleep(1000);
    let locationDropdownValue = element(by.xpath(`//li[@role='option'][text()='${locationValue}']`));
    await locationDropdownValue.click();
});

When(/^I click "Find" button$/, async function() {
    let findButton = element(by.xpath('//button[@type="submit"]'));
    await findButton.click();
    const searchResults = await element(by.xpath('//li[@class=\'search-result__item\']'));
    await browser.wait(EC.presenceOf(searchResults));
});

Then(/^"([^"]*)" position is displayed$/, async function(position) {
    const positions = await element.all(by.xpath(`//li[@class='search-result__item']`)).getText();
    expect(positions[0]).to.include(`${position}`);
});