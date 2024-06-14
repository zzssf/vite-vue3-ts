import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import "normalize.css"

process.env.VITE_IS_APP && import("amfe-flexible")

createApp(App).mount("#app")
