import gHeader from './g-header/main'

const components = [
  gHeader
];

const gobal = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component);
  });
}

export default gobal;
