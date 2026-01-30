import { Link, Outlet, useLocation } from 'react-router-dom';
import { routes } from '@/routes';
import './index.css';

export function Layout() {
  const location = useLocation();

  // 过滤掉隐藏的路由
  const visibleRoutes = routes.filter((route) => !route.hidden);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Component Playground</h1>
          <p className="sidebar-subtitle">Registry 组件测试</p>
        </div>
        <nav className="sidebar-nav">
          {visibleRoutes.map((route, index) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={index}
                to={route.path || '/'}
                className={`menu-item ${isActive ? 'active' : ''}`}
              >
                {route.label || 'Unnamed'}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
