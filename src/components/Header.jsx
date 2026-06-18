const navItems = [
  ['archive', '档案', '01'],
  ['projects', '项目', '02'],
  ['notes', '笔记', '03'],
  ['about', '关于', '04'],
  ['contact', '联系', '05'],
];

export default function Header({ page, onRandom }) {
  return (
    <header className={`site-header ${page === 'home' ? 'home-nav' : ''}`} aria-label="主导航">
      <a className={`brand-mark ${page === 'home' ? 'is-active' : ''}`} href="#home" aria-label="BAT 首页">
        <span>BAT</span>
      </a>
      <nav aria-label="档案导航">
        {navItems.map(([key, label, index]) => (
          <a key={key} data-index={index} className={page === key ? 'is-active' : ''} href={`#${key}`}>
            {label}
          </a>
        ))}
        <button type="button" data-index="06" onClick={onRandom}>随机一帧</button>
      </nav>
    </header>
  );
}
