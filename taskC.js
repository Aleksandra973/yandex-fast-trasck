function a(translate /* (key: string) => string */) {
    // Ваше решение
    const dynamicTranslate = (str) => `translate=${str}`;
  
    const makeDynamicTranslations = (e) => {
      function rewriteObj(obj) {
        var keys = Object.keys(obj);
        for (var i of keys) {
          if (typeof obj[i] == "string" && obj[i].startsWith("translate=")) {
            let key1 = obj[i].replace("translate=", "");
            Object.defineProperty(obj, i, {
              get() {
                return translate(key1);
              },
            });
          } else if (Array.isArray(obj[i])) {
            reWriteArray(obj, i);
          } else if (typeof obj[i] == "object" && obj[i] !== null) {
            rewriteObj(obj[i]);
          }
        }
      }
  
      rewriteObj(e);
  
      function reWriteArray(e, key) {
        var arr = [...e[key]];
  
        Object.defineProperty(e, key, {
          get() {
            var updatedArr = [];
            for (const item2 of arr) {
              if (typeof item2 == "string" && item2.startsWith("translate=")) {
                  updatedArr.push(translate(item2.replace("translate=", "")));
              } else if (typeof item2 == "object") {
                rewriteObj(item2);
                updatedArr.push(item2);
              } else {
              /*else if (Array.isArray(item2)) {
                arr.push(reWriteArray(item2));
              }*/
              updatedArr.push(item2);
              }
            }
  
            return updatedArr;
          },
        });
      }
  
      return e;
    };
  
    return {
      makeDynamicTranslations,
      dynamicTranslate,
    };
  }

  module.exports = a;
  