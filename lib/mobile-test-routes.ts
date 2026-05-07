export function isMobileTestRoute(pathname: string | null) {
  return (
    pathname === "/mobile-tests" ||
    pathname === "/mobile-test-1" ||
    pathname === "/mobile-test-2" ||
    pathname === "/mobile-test-3"
  );
}
