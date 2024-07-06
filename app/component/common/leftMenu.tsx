import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftMenu = () => {
  const pathname = usePathname();
  
  return(
    <aside id="sidebar" className="sidebar">

      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/admin' ? 'sidebar-nav-active' :''}`} href="/admin">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/admin/category' || pathname === '/admin/category/add' || pathname.startsWith('/admin/category/') ? 'sidebar-nav-active' :''}`} href="/admin/category">
            <i className="bi bi-grid"></i>
            <span>Category</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/admin/sub-category' || pathname === '/admin/sub-category/add' || pathname.startsWith('/admin/sub-category/') ? 'sidebar-nav-active' :''}`} href="/admin/sub-category">
            <i className="bi bi-grid"></i>
            <span>SubCategory</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/admin/blog' || pathname === '/admin/blog/add' || pathname.startsWith('/admin/blog/') ? 'sidebar-nav-active' :''}`} href="/admin/blog">
            <i className="bi bi-grid"></i>
            <span>Blog</span>
          </Link>
        </li>

      </ul>

    </aside>
  );
}

export default LeftMenu;