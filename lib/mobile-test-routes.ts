export function isMobileTestRoute(pathname: string | null) {
  return (
    pathname === "/mobile-tests" ||
    pathname === "/mobile-test-1" ||
    pathname === "/mobile-test-2" ||
    pathname === "/mobile-test-3"
  );
}

export function isDesignLabRoute(pathname: string | null) {
  return pathname === "/design-lab" || Boolean(pathname?.startsWith("/design-lab/"));
}

export function shouldHidePublicChrome(pathname: string | null) {
  return isMobileTestRoute(pathname) || isDesignLabRoute(pathname);
}
