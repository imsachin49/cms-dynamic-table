import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-white border border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">Headless CMS</span>
        </Link>
        <Link to="/createEntity" className="block border p-[5px] px-2 rounded-[5px] bg-gray-900 text-gray-100 mx-6">Create Entity</Link>
      </div>
    </nav>
  )
}