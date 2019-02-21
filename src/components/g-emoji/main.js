import component from './src/app.vue';

component.install = function (Vue) {
    Vue.components(component.name, component);
};
export default component;
