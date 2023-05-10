const arrSignal = require("./taskA");

test("default", () => {
  expect(
    arrSignal([
      {
        time: 0,
        value: "yandex",
      },
      {
        time: 8,
        value: "adventure",
      },
      {
        time: 3,
        value: "010",
      },
      {
        time: 9,
        value: "01111",
      },
    ])
  ).toEqual("event");
});

test("empty", () => {
  expect(arrSignal([])).toEqual("");
});
test("wordsMoreThanCodes", () => {
  expect(
    arrSignal([
      {
        time: 0,
        value: "yandex",
      },
      {
        time: 8,
        value: "adventure",
      },
      {
        time: 3,
        value: "010",
      },
      {
        time: 9,
        value: "01111",
      },
      {
        time: 17,
        value: "hkhgjujjf",
      },
    ])
  ).toEqual("event");
});

test("nullValue", () => {
  expect(
    arrSignal([
      {
        time: 1,
        value: "yandex",
      },
      {
        time: 9,
        value: "adventure",
      },
      {
        time: 9,
        value: "",
      },
      {
        time: 7,
        value: null,
      },
      {
        time: 10,
        value: "0010",
      },
    ])
  ).toEqual("e");
});

test("emptyCode", () => {
  expect(
    arrSignal([
      {
        time: 1,
        value: "yandex",
      },
      {
        time: 9,
        value: "adventure",
      },
      {
        time: 9,
        value: "",
      },
      {
        time: 4,
        value: "000",
      },
      {
        time: 7,
        value: null,
      },
      {
        time: 10,
        value: "00000",
      },
    ])
  ).toEqual("");
});
