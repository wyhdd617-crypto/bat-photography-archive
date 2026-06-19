const navItems = [
  ['archive', '档案'],
  ['projects', '项目'],
  ['about', '关于'],
  ['contact', '联系'],
  ['thoughts', '蝙蝠小脑袋在想什么？'],
];

export default function Header({ page }) {
  return (
    <header className={`site-header ${page === 'home' ? 'home-nav' : ''}`} aria-label="主导航">
      <a className={`brand-mark ${page === 'home' ? 'is-active' : ''}`} href="#home" aria-label="BAT 首页">
        <span>BAT</span>
      </a>
      <nav aria-label="档案导航">
        {navItems.map(([key, label]) => (
          <a key={key} className={page === key ? 'is-active' : ''} href={`#${key}`}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
