import Link from "next/link";

interface PostJobBtnProps {
  onClick?: () => void;
  className?: string;
}

export default function PostJobBtn({ onClick, className = "" }: PostJobBtnProps) {
  return (
    <Link 
      href="/post-a-job" 
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition active:scale-[0.98] ${className}`}
    >
      Post a Job
    </Link>
  );
}