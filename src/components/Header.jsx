const navItems = [
  ['home', '首页'],
  ['work', '作品'],
  ['about', '声明'],
  ['contact', '联系'],
];

export default function Header({ page }) {
  return (
    <header className="site-header" aria-label="主导航">
      <a className="brand-mark" href="#home" aria-label="BAT 首页">
        BAT
      </a>
      <nav>
        {navItems.map(([key, label]) => (
          <a
            key={key}
            className={page === key ? 'is-active' : ''}
            href={`#${key}`}
            aria-current={page === key ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
