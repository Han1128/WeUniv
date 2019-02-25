import gHeader from './g-header/main'
import gEmoji from './g-emoji/main'
import gShortText from  './g-shortText-modal/main'
import gImgUpload from  './g-img-upload/main'

const components = [
  gHeader,
  gEmoji,
  gShortText,
  gImgUpload
];

const gobal = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component);
  });
}

export default gobal;
