import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href="/" className="text-xl font-bold tracking-tight text-blue-600 hover:opacity-90">
        myjobs<span className="text-gray-900">inSouthSudan</span>
      </Link>
    </div>
  );
}