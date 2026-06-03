import NavLink from "./NavLink";
import PostJobBtn from "./PostJobBtn";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Dimmer */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Side Drawer Body */}
      <div 
        className="fixed top-0 right-0 w-1/2 h-screen bg-white shadow-2xl z-50 border-l border-gray-100 p-6 pt-20 flex flex-col justify-between md:hidden animate-in slide-in-from-right duration-200"
        id="mobile-menu"
      >
        {/* Absolute Close Target Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-4 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none transition"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Links */}
        <div className="flex flex-col space-y-4">
          <NavLink href="/signin" onClick={onClose} className="text-base font-semibold text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 block">
            Sign In
          </NavLink>
          <NavLink href="/signup" onClick={onClose} className="text-base font-semibold text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 block">
            Get Started
          </NavLink>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-gray-100 pt-4 mb-6">
          <PostJobBtn onClick={onClose} className="w-full text-center py-3 text-base rounded-xl" />
        </div>
      </div>
    </>
  );
}