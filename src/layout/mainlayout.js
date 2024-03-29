import { Layout, Main } from '@components/common';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
  // State
  const [scrollBtn, setScrollBtn] = useState(false);

  const router = useRouter();
  // console.log(router.asPath);

  const hideNav = router.asPath.startsWith('/account');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setScrollBtn(true);
      } else {
        setScrollBtn(false);
      }
    });
  }, []);

  return (
    <div className='w-full relative'>
      <Main.ScrollToTop scrollBtn={scrollBtn} />

      {!hideNav && <Layout.Navbar Cookies={Cookies} />}
      {/* <Layout.Navbar Cookies={Cookies} /> */}
      <div>{children}</div>
      {!hideNav && <Layout.Footer />}
    </div>
  );
}
