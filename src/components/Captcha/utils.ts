import { GeeTestTypes } from 'entitiesState/auth';
import { CaptchaConfigTypes } from './types';

export const getJsCode = (data: GeeTestTypes & CaptchaConfigTypes): string => {
  const {
    lang = 'ru', gt, challenge, offline, newCaptcha, product = 'bind', hideSuccess = true,
  } = data;

  return `
  initGeetest({
        gt: "${gt}",
        challenge: "${challenge}",
        offline: ${offline},
        new_captcha: ${newCaptcha},
        lang: "${lang}",
        hideSuccess: ${hideSuccess},
        product: "${product}",
    }, function (captchaObj) {
          captchaObj.onReady(function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "onReady"}));
          })
          captchaObj.onSuccess (function() {
            var result = {
                type: "onSuccess",
                data: captchaObj.getValidate()
            }
            window.ReactNativeWebView.postMessage(JSON.stringify(result));
          }).onError(function () {
            captchaObj.reset()
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "onError"}));
          })

          if(navigator.appVersion.includes('Android')){
            document.addEventListener("message", function (event) {
              if (event.data === "handler") {
                 captchaObj.verify()
               }
               if (event.data === "reset") {
                 captchaObj.reset()
               }
            });
          } else {
            window.addEventListener("message", function (event) {
              if (event.data === "handler") {
                captchaObj.verify()
              }
              if (event.data === "reset") {
                 captchaObj.reset()
               }
            });
          }
        })
`;
};
