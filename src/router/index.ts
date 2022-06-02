import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: () => import('../views/Layout.vue'),
        redirect: '/map',
        children: [
            {
                path: '/map',
                component: () => import('../views/Map.vue'),
                name: 'Map',
            }
        ]
    }]
});

export default router;