import { createApp } from "vue";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
import App from "./app.vue";
import "./style.css";

const app = createApp(App);
const vfm = createVfm();

app.use(vfm).mount("#app");
