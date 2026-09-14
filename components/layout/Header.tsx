"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import NiceSelect from "@/components/ui/NiceSelect";

// Nguồn: roiser-html-package/roiser/assets/js/main.js
// $(".mobile-menu-items").meanmenu({ meanScreenWidth: "992", ... }) (dòng ~88-94)
// meanmenu chuyển sang menu mobile khi currentWidth <= meanScreenWidth (vendor/meanmenu.js dòng 139).
const MOBILE_MENU_BREAKPOINT = 992;

// Nguồn main.js: var minWidth = window.matchMedia("(min-width: 992px)"); (dòng 82)
// sticky chỉ bật khi header có class "sticky-active" và khớp min-width này (dòng 83-84).
const STICKY_MIN_WIDTH = 992;

// Nguồn main.js: if (scroll >= 110) stickyHeader.addClass("fixed"); (dòng 64)
const STICKY_SCROLL_THRESHOLD = 110;

// Nguồn main.js: $(window).on("load", ...) => $("#preloader").delay(1000).fadeOut(500); (dòng 19-20)
const PRELOADER_DELAY = 1000;
const PRELOADER_FADE_DURATION = 500;

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "index.html",
    active: true,
    children: [
      { label: "Fashion Home", href: "index.html" },
      { label: "Grocery Home", href: "index-2.html" },
      { label: "Furniture", href: "index-3.html" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Shop", href: "/shop" },
      { label: "Shop Grid", href: "shop-grid.html" },
      { label: "Shop Details", href: "shop-details.html" },
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  { label: "Women", href: "shop-grid.html" },
  { label: "men", href: "shop-grid.html" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "About", href: "about.html" },
      { label: "Login", href: "/login" },
      { label: "Register", href: "register.html" },
      { label: "Faq", href: "faq.html" },
      { label: "404 Error", href: "error.html" },
    ],
  },
  {
    label: "Blog",
    href: "blog-grid.html",
    children: [
      { label: "Blog Grid", href: "blog-grid.html" },
      { label: "Blog list", href: "blog-grid-2.html" },
      { label: "Blog Details", href: "blog-details.html" },
    ],
  },
  { label: "Contact", href: "contact.html" },
];

export default function Header() {
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [primaryHeaderHeight, setPrimaryHeaderHeight] = useState(0);
  const primaryHeaderRef = useRef<HTMLDivElement>(null);

  // Thay cho meanmenu: theo dõi đúng breakpoint 992px để chọn menu desktop hay mobile.
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MENU_BREAKPOINT}px)`);
    const update = () => setIsMobileLayout(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Panel mobile chỉ có ý nghĩa ở layout mobile; suy ra thay vì reset bằng effect
  // để tránh setState ngay trong effect (resize về desktop sẽ tự coi như đã đóng).
  const isSideMenuVisible = isMobileLayout && isSideMenuOpen;

  // Đo chiều cao thật của primary-header (lúc còn ở vị trí tĩnh) để làm spacer khi chuyển fixed.
  useEffect(() => {
    const measure = () => {
      if (primaryHeaderRef.current) {
        setPrimaryHeaderHeight(primaryHeaderRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Thay cho jQuery scroll handler: chỉ bật sticky khi khớp breakpoint desktop, giống main.js.
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${STICKY_MIN_WIDTH}px)`);

    const onScroll = () => {
      setIsSticky(window.scrollY >= STICKY_SCROLL_THRESHOLD);
    };

    const syncListener = () => {
      window.removeEventListener("scroll", onScroll);
      if (mql.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        setIsSticky(false);
      }
    };

    syncListener();
    mql.addEventListener("change", syncListener);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", syncListener);
    };
  }, []);

  // Thay cho: $(window).on("load", ...) => $("#preloader").delay(1000).fadeOut(500);
  // và $(".preloader-close").on("click", ...) => $("#preloader").delay(0).fadeOut(500);
  const [preloaderPhase, setPreloaderPhase] = useState<"visible" | "fading" | "hidden">(
    "visible"
  );
  const preloaderTimers = useRef<{
    delay?: ReturnType<typeof setTimeout>;
    fade?: ReturnType<typeof setTimeout>;
  }>({});

  const fadeOutPreloader = () => {
    setPreloaderPhase("fading");
    preloaderTimers.current.fade = setTimeout(
      () => setPreloaderPhase("hidden"),
      PRELOADER_FADE_DURATION
    );
  };

  useEffect(() => {
    const onWindowLoad = () => {
      preloaderTimers.current.delay = setTimeout(fadeOutPreloader, PRELOADER_DELAY);
    };

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    return () => {
      window.removeEventListener("load", onWindowLoad);
      clearTimeout(preloaderTimers.current.delay);
      clearTimeout(preloaderTimers.current.fade);
    };
  }, []);

  const handlePreloaderClose = () => {
    clearTimeout(preloaderTimers.current.delay);
    clearTimeout(preloaderTimers.current.fade);
    fadeOutPreloader();
  };

  const preloaderStyle: CSSProperties =
    preloaderPhase === "hidden"
      ? { display: "none" }
      : {
          opacity: preloaderPhase === "fading" ? 0 : 1,
          transition: `opacity ${PRELOADER_FADE_DURATION}ms ease`,
        };

  const toggleSideMenu = () => setIsSideMenuOpen((open) => !open);
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
    setOpenSubmenuIndex(null);
  };
  const toggleSubmenu = (index: number) =>
    setOpenSubmenuIndex((current) => (current === index ? null : index));

  return (
    <>
      <header className="header sticky-active">
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-inner">
              <div className="top-bar-left">
                <ul className="top-left-list">
                  <li><a href="about.html">About</a></li>
                  <li><a href="contact.html">My Account</a></li>
                  <li><a href="/wishlist">Wishlist</a></li>
                  <li><a href="/checkout">Checkout</a></li>
                </ul>
              </div>
              <div className="top-bar-middle">
                <span>Free shipping for all orders of 150$</span>
              </div>
              <div className="top-bar-right">
                <ul className="top-right-list">
                  <li><a href="contact.html">Store Location</a></li>
                  <li>
                    <NiceSelect
                      className="select-control country"
                      defaultValue=""
                      options={[
                        { value: "", label: "Language" },
                        { value: "vdt", label: "English" },
                        { value: "can", label: "Bangla" },
                        { value: "uk", label: "Arabic" },
                      ]}
                    />
                  </li>
                  <li>
                    <NiceSelect
                      className="select-control select-2 country"
                      defaultValue=""
                      options={[
                        { value: "", label: "Currency" },
                        { value: "vdt", label: "Doller" },
                        { value: "can", label: "Rupee" },
                        { value: "uk", label: "Taka" },
                      ]}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="header-middle-inner">
              <div className="header-middle-left">
                <div className="header-logo d-lg-block">
                  <a href="index.html">
                    <img src="/assets/img/logo/logo-1.png" alt="Logo" />
                  </a>
                </div>
                <div className="category-form-wrap">
                  <NiceSelect
                    className="select-control country"
                    defaultValue=""
                    options={[
                      { value: "", label: "ALL Categories" },
                      { value: "vdt", label: "Fashion" },
                      { value: "can", label: "Organic" },
                      { value: "uk", label: "Furniture" },
                    ]}
                  />
                  <form className="header-form" action="mail.php">
                    <input className="form-control" type="text" name="search" placeholder="Search here..." />
                    <button className="submit rr-primary-btn">Search here</button>
                  </form>
                </div>
              </div>
              <div className="header-middle-right">
                <ul className="contact-item-list">
                  <li>
                    <div className="content">
                      <span>Call Us Now:</span>
                      <a className="number" href="tel:+25821592159">+(258) 2159-2159</a>
                    </div>
                    <a href="#" className="icon">
                      <i className="fa-regular fa-phone" />
                    </a>
                  </li>
                  <li>
                    <a href="/wishlist" className="icon">
                      <i className="fa-sharp fa-regular fa-heart" />
                    </a>
                  </li>
                  <li>
                    <a href="/cart" className="icon">
                      <i className="fa-light fa-bag-shopping" />
                      <span>2</span>
                    </a>
                    <div className="content">
                      <span>Your cart,</span>
                      <h5 className="number">$1280.00</h5>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={primaryHeaderRef}
          className={`primary-header${isSticky ? " fixed" : ""}`}
        >
          <div className="container">
            <div className="primary-header-inner">
              <div className="header-logo mobile-logo">
                <a href="index.html">
                  <img src="/assets/img/logo/logo-1.png" alt="Logo" />
                </a>
              </div>
              <div className="header-menu-wrap">
                {!isMobileLayout && (
                  <div className="mobile-menu-items">
                    <ul>
                      {navItems.map((item) => (
                        <li
                          key={item.label}
                          className={[
                            item.children ? "menu-item-has-children" : "",
                            item.active ? "active" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <a href={item.href}>{item.label}</a>
                          {item.children && (
                            <ul>
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <a href={child.href}>{child.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* /.header-menu-wrap */}
              <div className="header-right-wrap">
                <div className="header-right">
                  <span>Get 30% Discount Now <span>Sale</span></span>
                  <div className="header-right-item">
                    <a
                      href="javascript:void(0)"
                      className="mobile-side-menu-toggle"
                      onClick={toggleSideMenu}
                    >
                      <i className="fa-sharp fa-solid fa-bars" />
                    </a>
                  </div>
                </div>
                {/* /.header-right */}
              </div>
            </div>
            {/* /.primary-header-inner */}
          </div>
        </div>

        {/* Spacer: giữ đúng chiều cao primary-header đo được, tránh giật trang khi primary-header
            chuyển sang position: fixed (thay cho cách main.js gán cứng height cho .header). */}
        <div style={{ height: isSticky ? primaryHeaderHeight : 0 }} aria-hidden="true" />
      </header>
      {/* /.Main Header */}

      <div id="popup-search-box">
        <div className="box-inner-wrap d-flex align-items-center">
          <form id="form" action="#" method="get" role="search">
            <input id="popup-search" type="text" name="search" placeholder="Type keywords here..." />
          </form>
          <div className="search-close"><i className="fa-sharp fa-regular fa-xmark" /></div>
        </div>
      </div>
      {/* /#popup-search-box */}

      <div className={`mobile-side-menu${isSideMenuVisible ? " is-open" : ""}`}>
        <div className="side-menu-content">
          <div className="side-menu-head">
            <a href="index.html"><img src="/assets/img/logo/logo-1.png" alt="logo" /></a>
            <button className="mobile-side-menu-close" onClick={closeSideMenu}>
              <i className="fa-regular fa-xmark" />
            </button>
          </div>
          <div className="side-menu-wrap">
            {isMobileLayout && (
              <div className="mean-bar">
                <nav className="mean-nav">
                  <ul>
                    {navItems.map((item, index) => (
                      <li key={item.label}>
                        <a href={item.href}>{item.label}</a>
                        {item.children && (
                          <>
                            <a
                              href="#"
                              className={`mean-expand${
                                openSubmenuIndex === index ? " mean-clicked" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleSubmenu(index);
                              }}
                            >
                              <i className="fa-solid fa-caret-down" />
                            </a>
                            {openSubmenuIndex === index && (
                              <ul>
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <a href={child.href}>{child.label}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
          <ul className="side-menu-list">
            <li><i className="fa-light fa-location-dot" />Address : <span>Amsterdam, 109-74</span></li>
            <li><i className="fa-light fa-phone" />Phone : <a href="tel:+01569896654">+01 569 896 654</a></li>
            <li><i className="fa-light fa-envelope" />Email : <a href="mailto:info@example.com">info@example.com</a></li>
          </ul>
        </div>
      </div>
      {/* /.mobile-side-menu */}

      <div id="preloader" style={preloaderStyle}>
        <div className="preloader-close" onClick={handlePreloaderClose}>X</div>
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1"></div>
          <div className="sk-child sk-bounce2"></div>
          <div className="sk-child sk-bounce3"></div>
        </div>
      </div>
      {/* ./ preloader */}
    </>
  );
}
