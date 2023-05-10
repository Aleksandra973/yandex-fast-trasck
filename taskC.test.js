const a = require("./taskC");

let lang = "en";

const changeLanguage = (newLang) => {
  lang = newLang;
};

const translate = (str) => `${lang}:${str}`;

const { makeDynamicTranslations, dynamicTranslate } = a(translate);

test("key in root", () => {
  const object = makeDynamicTranslations({
    key: dynamicTranslate("key"),
    key2: dynamicTranslate("key2"),
  });

  expect(object.key).toEqual("en:key");
  changeLanguage("ru");
  expect(object.key2).toEqual("ru:key2");
});

test("key deep", () => {
  const object = makeDynamicTranslations({
    key: { deep: dynamicTranslate("key") },
    key2: dynamicTranslate("key2"),
  });

  expect(object.key.deep).toEqual("ru:key");
  changeLanguage("en");
  expect(object.key2).toEqual("en:key2");
});

test("arr", () => {
  changeLanguage("en");
  const object = makeDynamicTranslations({
    key: { deep: dynamicTranslate("key") },
    key2: dynamicTranslate("key2"),
    key3: 10,
    key4: {
      innerKey: "innerKey",
      innerObj: {
        test: 123,
        key: null,
        someOtherKey: [],
      },
    },
    array: [
      dynamicTranslate("array1"),
      dynamicTranslate("array2"),
      dynamicTranslate("array3"),
      {
        key: dynamicTranslate("array4"),
      },
    ],
  });

  expect(object.key.deep).toEqual("en:key");
  changeLanguage("ru");
  expect(object.key2).toEqual("ru:key2");
  expect(object.array[0]).toEqual("ru:array1");
  expect(object.array[3].key).toEqual("ru:array4");
});
