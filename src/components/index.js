import gHeader from './g-header/main'
import gEmoji from './g-emoji/main'

const components = [
  gHeader,
  gEmoji
];

const gobal = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component);
  });
}

export default gobal;
