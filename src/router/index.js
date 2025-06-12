import {createRouter, createWebHistory} from 'vue-router'
import AppDrawer from '../components/Screen/AppDrawer.vue'
import DrivingDynamics from "@/components/Screen/DrivingDynamics.vue";
import Performance from "@/components/Screen/Performance.vue";
import Options from "@/components/Screen/Options.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'apps',
            component: AppDrawer
        },
        {
            path: '/driving_dynamics',
            name: 'driving_dynamics',
            component: DrivingDynamics
        },
        {
            path: '/performance',
            name: 'performance',
            component: Performance
        },
        {
            path: '/options',
            name: 'options',
            component: Options
        }
    ]
})

export default router