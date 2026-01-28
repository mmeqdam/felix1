import { NavLink } from 'react-router-dom';

const aboutPages = [
  { name: 'قصتنا', path: '/about/our-story' },
  { name: 'الاستدامة', path: '/about/sustainability' },
  { name: 'دليل المقاسات', path: '/about/size-guide' },
  { name: 'خدمة العملاء', path: '/about/customer-care' },
  { name: 'فروعنا', path: '/about/store-locator' }
];

const AboutSidebar = () => {
  return (
    <aside className="hidden md:block w-64 sticky top-32 h-fit px-6" dir="rtl">
      <nav className="space-y-1">
        <h3 className="text-lg font-light text-foreground mb-6">عن فيليكس</h3>
        {aboutPages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) =>
              `block py-2 text-sm font-light transition-all ${
                isActive
                  ? 'text-primary underline decoration-2 underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground hover:underline hover:decoration-1 hover:underline-offset-4'
              }`
            }
          >
            {page.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AboutSidebar;
