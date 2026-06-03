import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({ href, children, onClick, className = "" }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`text-sm font-medium text-gray-600 hover:text-blue-600 transition ${className}`}
    >
      {children}
    </Link>
  );
}