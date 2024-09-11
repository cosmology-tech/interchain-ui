import { transform } from "vue-metamorph";
import { vueMitosisCodeMod } from "./plugins/vue-mitosis.plugin";

export function vueCodemod(source: string) {
  return transform(source, "file.vue", [vueMitosisCodeMod]).code;
}
