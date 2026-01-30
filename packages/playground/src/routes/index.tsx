import { HelloWorld } from '@/pages/HelloWorld';
import { NewPage } from '@/pages/NewPage';

export interface RouteConfig {
  path?: string;
  label?: string;
  icon?: string;
  hidden?: boolean;
  element?: React.ReactNode;
  index?: boolean;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Hello World',
    element: <HelloWorld />,
    index: true,
  },
  {
    path: '/new-page',
    label: 'New Page',
    element: <NewPage />,
  }
  // 后续添加更多路由
];
