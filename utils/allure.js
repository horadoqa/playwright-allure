import * as allure from 'allure-js-commons';

export async function setAllureFeature(feature, story) {
  await allure.feature(feature);
  await allure.story(story);
}