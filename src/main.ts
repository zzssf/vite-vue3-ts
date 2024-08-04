import { createApp } from "vue"
import router from "@/router"
import store from "@/store"
import "./style.css"
import App from "./App.vue"
import SvgIcon from "./icons" // icon

import "normalize.css"

process.env.VITE_IS_APP && import("amfe-flexible")

const app = createApp(App)

app.use(store).use(router)
app.component("svg-icon", SvgIcon)
router.isReady().then(() => {
  app.mount("#app")
})
