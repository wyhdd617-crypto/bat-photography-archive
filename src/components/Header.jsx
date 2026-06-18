const navItems = [
  ['archive', '01', '档案'],
  ['projects', '02', '项目'],
  ['notes', '03', '笔记'],
  ['about', '04', '关于'],
  ['contact', '05', '联系'],
];

export default function Header({ page, onRandom }) {
  return (
    <header className="site-header" aria-label="主导航">
      <a className={`brand-mark ${page === 'home' ? 'is-active' : ''}`} href="#home" aria-label="BAT 首页">
        <span>BAT</span><small>00</small>
      </a>
      <nav aria-label="档案导航">
        {navItems.map(([key, index, label]) => (
          <a key={key} className={page === key ? 'is-active' : ''} href={`#${key}`}>
            <span>{index}</span>{label}
          </a>
        ))}
        <button type="button" onClick={onRandom}><span>RND</span>随机一帧</button>
      </nav>
    </header>
  );
}
