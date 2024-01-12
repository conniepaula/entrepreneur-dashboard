import { Link, LinkProps, useLocation } from "react-router-dom";

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      data-active={pathname === props.to}
      className="flex items-center gap-1.5 text-lg font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground md:text-sm"
      {...props}
    />
  );
}
