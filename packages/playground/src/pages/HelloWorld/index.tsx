import './index.css';

export function HelloWorld() {
  return (
    <div className="hello-world">
      <div className="hello-card">
        <div className="hello-icon">👋</div>
        <h1 className="hello-title">Hello World!</h1>
        <p className="hello-description">
          欢迎来到 Component Playground
        </p>
        <div className="hello-info">
          <div className="info-card">
            <h3>🎯 目标</h3>
            <p>验证 apps/www/registry 组件的使用流程</p>
          </div>
          <div className="info-card">
            <h3>📦 功能</h3>
            <p>测试不同组件的各种使用场景</p>
          </div>
          <div className="info-card">
            <h3>🚀 开始</h3>
            <p>通过左侧导航选择要测试的组件</p>
          </div>
        </div>
        <div className="hello-footer">
          <p>使用 Vite + React 构建</p>
        </div>
      </div>
    </div>
  );
}
