import LayoutContainer from '../layouts/Layout.vue';
import HomeContainer from '../modules/home/views/index.vue'

const routes = [
    {
        path: '/',
        name: 'LayoutContainer',
        component: LayoutContainer,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'HomeContainer',
                component: HomeContainer,
                meta: {
                    title: 'home目录'
                }
            }
        ]
    }
];

export default routes;