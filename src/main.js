import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/main.css";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});

app.component("PCard", Card);
app.component("PButton", Button);
app.component("PInputText", InputText);
app.component("PDataTable", DataTable);
app.component("PColumn", Column);
app.component("PTag", Tag);
app.component("PDropdown", Dropdown);

app.mount("#app");