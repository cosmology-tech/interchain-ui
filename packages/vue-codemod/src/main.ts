import { transform } from "vue-metamorph";
import { vueMitosisPlugin } from "./plugins/vue-mitosis.plugin";

export function vueCodemod(source: string) {
  return transform(source, "file.vue", [vueMitosisPlugin]).code;
}
