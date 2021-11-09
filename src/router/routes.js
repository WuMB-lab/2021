import LayoutContainer from '../layouts/Layout.vue';
import HomeContainer from '../modules/home/views/index.vue';
import DemoHome from '../modules/example/demo/views/index.vue';
// import Analysis from '../modules/chart/analysis/views/Analysis.vue';
// import Monitor from '../modules/chart/monitor/views/Monitor.vue';
import ComputerInstanceContainer from '../modules/instance/views/index.vue';
import StudentContainer from '../modules/student/views/index.vue';

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
            },
            {
                path: 'example',
                name: 'Example',
                meta: {
                    title: '示例模块'
                }
            },
            {
                path: 'example/student',
                name: 'StudentContainer',
                component: StudentContainer,
                meta: {
                    title: '学生管理'
                }
            },
            {
                path: 'example/other-demo/home',
                name: 'DemoHome',
                component: DemoHome,
                meta: {
                    title: '综合示例'
                }
            },
			{
                path: 'computer/instance',
                name: 'ComputerInstanceContainer',
                component: ComputerInstanceContainer,
                meta: {
                    title: '信息实例'
                }
            },
            // {
            //     path: 'chart/analysis',
            //     component: Analysis,
            //     name: 'Analysis',
            //     meta: {
            //         title: '分析页'
            //     }
            // },
            // {
            //     path: 'chart/monitor',
            //     component: Monitor,
            //     name: 'Monitor',
            //     meta: {
            //         title: '分析页'
            //     }
            // }
        ]
    }
];

export default routes;