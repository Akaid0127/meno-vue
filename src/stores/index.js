import { createPinia } from 'pinia'
import { createPersistedState } from "pinia-persistedstate-plugin"; // 持久化

const pinia = createPinia()
pinia.use(createPersistedState());

export default pinia