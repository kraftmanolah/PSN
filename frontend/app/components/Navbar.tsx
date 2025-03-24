
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/app/hooks/useAuth";
// import useSWR from "swr";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faCaretDown, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

// const fetcher = (url: string, token: string | null) =>
//   fetch(url, {
//     headers: token ? { Authorization: `Token ${token}` } : {},
//     redirect: "manual",
//     credentials: "include",
//   }).then((res) => {
//     if (!res.ok) throw new Error("Failed to fetch cart");
//     return res.json();
//   });

// const Navbar: React.FC = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { token, user, logout } = useAuth();
//   const router = useRouter();
//   const { data: cart, error: cartError } = useSWR(
//     token ? ["http://localhost:8000/api/cart/", token] : null,
//     ([url, authToken]) => fetcher(url, authToken)
//   );

//   const userMenuRef = useRef<HTMLDivElement>(null);

//   const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

//   const toggleUserMenu = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setUserMenuOpen((prev) => !prev);
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setMobileMenuOpen(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const cartCount = cart?.item_count || 0;

//   const getDisplayName = () => {
//     if (!user) return "User";
//     if (user.user_type === "individual" && user.full_name) {
//       const firstName = user.full_name.split(" ")[0];
//       return firstName || user.email || "User";
//     } else if (user.user_type === "organization" && user.organization_name) {
//       return user.organization_name;
//     }
//     return user.email || "User";
//   };

//   const getLinkClass = (path: string) => {
//     const isActive = pathname === path;
//     return isActive
//       ? "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1"
//       : "text-gray-300 hover:text-yellow-400";
//   };

//   return (
//     <nav className="bg-black w-full py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-white relative">
//       {/* Left: Logo */}
//       <div className="flex items-center">
//         <Link href="/">
//           <Image
//             src="/images/logo.png"
//             alt="Printshop Naija"
//             width={120}
//             height={40}
//             className="h-10 w-auto"
//           />
//         </Link>
//       </div>

//       {/* Center: Navigation Links (Desktop) */}
//       <div className="hidden lg:flex items-center space-x-6">
//         <Link href="/" className={getLinkClass("/")}>
//           Home
//         </Link>
//         <Link href="/shop" className={getLinkClass("/shop")}>
//           Shop
//         </Link>
//         <Link href="/about" className={getLinkClass("/about")}>
//           About Us
//         </Link>
//         <Link href="/help" className={getLinkClass("/help")}>
//           Help
//         </Link>
//       </div>

//       {/* Right: Search bar, User, and Cart */}
//       <div className="flex items-center space-x-3 sm:space-x-4">
//         {/* Search Bar (Desktop) */}
//         <div className="relative hidden sm:block">
//           <input
//             type="text"
//             placeholder="Search products, categories..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="py-1.5 px-3 w-40 sm:w-48 lg:w-64 rounded-full bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             aria-label="Search products and categories"
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//             aria-label="Search"
//           >
//             <FontAwesomeIcon icon={faSearch} size="sm" />
//           </button>
//         </div>

//         {/* User and Cart */}
//         <div className="flex items-center space-x-3 sm:space-x-4">
//           {user ? (
//             <>
//               <div className="relative" ref={userMenuRef}>
//                 <button onClick={toggleUserMenu} className="flex items-center text-gray-300 hover:text-yellow-400">
//                   <span>Hi, {getDisplayName()}!</span>
//                   <FontAwesomeIcon
//                     icon={faCaretDown}
//                     className="ml-1 text-gray-300"
//                     size="sm"
//                   />
//                 </button>
//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
//                     <Link
//                       href="/profile"
//                       className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
//                       onClick={() => setUserMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logout();
//                         setUserMenuOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <Link href="/cart" className="relative">
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className="text-yellow-500"
//                   size="lg"
//                 />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link href="/signin" className="text-gray-300 hover:text-yellow-400 text-sm sm:text-base">
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="bg-yellow-400 text-black px-3 py-1.5 rounded hover:bg-yellow-500 text-sm sm:text-base"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="lg:hidden flex items-center">
//           <button onClick={toggleMenu} className="text-gray-300 hover:text-yellow-400">
//             <FontAwesomeIcon icon={faBars} size="lg" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu (hidden on desktop) */}
//       {isMobileMenuOpen && (
//         <div className="absolute top-full left-0 w-full bg-gray-900 shadow-md flex flex-col items-center space-y-4 py-4 lg:hidden z-50">
//           {/* Mobile Search Bar */}
//           <div className="w-11/12 sm:w-3/4 mx-auto">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products, categories..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full py-1.5 px-3 rounded-full bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 aria-label="Search products and categories"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 aria-label="Search"
//               >
//                 <FontAwesomeIcon icon={faSearch} size="sm" />
//               </button>
//             </div>
//           </div>
//           <Link href="/" className={getLinkClass("/")} onClick={() => setMobileMenuOpen(false)}>
//             Home
//           </Link>
//           <Link href="/shop" className={getLinkClass("/shop")} onClick={() => setMobileMenuOpen(false)}>
//             Shop
//           </Link>
//           <Link href="/about" className={getLinkClass("/about")} onClick={() => setMobileMenuOpen(false)}>
//             About Us
//           </Link>
//           <Link href="/help" className={getLinkClass("/help")} onClick={() => setMobileMenuOpen(false)}>
//             Help
//           </Link>
//           {user ? (
//             <>
//               <div className="relative" ref={userMenuRef}>
//                 <button onClick={toggleUserMenu} className="flex items-center text-gray-300 hover:text-yellow-400">
//                   <span>Hi, {getDisplayName()}!</span>
//                   <FontAwesomeIcon
//                     icon={faCaretDown}
//                     className="ml-1 text-gray-300"
//                     size="sm"
//                   />
//                 </button>
//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
//                     <Link
//                       href="/profile"
//                       className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
//                       onClick={() => {
//                         setUserMenuOpen(false);
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logout();
//                         setUserMenuOpen(false);
//                         setMobileMenuOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <Link href="/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className="text-yellow-500"
//                   size="lg"
//                 />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link href="/signin" className="text-gray-300 hover:text-yellow-400 text-sm" onClick={() => setMobileMenuOpen(false)}>
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="bg-yellow-400 text-black px-3 py-1.5 rounded hover:bg-yellow-500 text-sm"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { useAuth } from "@/app/hooks/useAuth";
import useSWR from "swr";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCaretDown, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url: string, token: string | null) =>
  fetch(url, {
    headers: token ? { Authorization: `Token ${token}` } : {},
    redirect: "manual",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
  });

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, user, logout } = useAuth();
  const router = useRouter();
  const currentPathname = usePathname(); // Assign usePathname() to a variable
  const { data: cart, error: cartError } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/`, token] : null,
    ([url, authToken]) => fetcher(url, authToken)
  );

  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserMenuOpen((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cart?.item_count || 0;

  const getDisplayName = () => {
    if (!user) return "User";
    if (user.user_type === "individual" && user.full_name) {
      const firstName = user.full_name.split(" ")[0];
      return firstName || user.email || "User";
    } else if (user.user_type === "organization" && user.organization_name) {
      return user.organization_name;
    }
    return user.email || "User";
  };

  const getLinkClass = (path: string) => {
    const isActive = currentPathname === path; // Use the assigned variable
    return isActive
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1"
      : "text-gray-300 hover:text-yellow-400";
  };

  return (
    <nav className="bg-black w-full py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-white relative">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Printshop Naija"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Center: Navigation Links (Desktop) */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link href="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link href="/shop" className={getLinkClass("/shop")}>
          Shop
        </Link>
        <Link href="/about" className={getLinkClass("/about")}>
          About Us
        </Link>
        <Link href="/help" className={getLinkClass("/help")}>
          Help
        </Link>
      </div>

      {/* Right: Search bar, User, and Cart */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Search Bar (Desktop) */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search products, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="py-1.5 px-3 w-40 sm:w-48 lg:w-64 rounded-full bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Search products and categories"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faSearch} size="sm" />
          </button>
        </div>

        {/* User and Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {user ? (
            <>
              <div className="relative" ref={userMenuRef}>
                <button onClick={toggleUserMenu} className="flex items-center text-gray-300 hover:text-yellow-400">
                  <span>Hi, {getDisplayName()}!</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="ml-1 text-gray-300"
                    size="sm"
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Link href="/cart" className="relative">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-yellow-500"
                  size="lg"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-gray-300 hover:text-yellow-400 text-sm sm:text-base">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-yellow-400 text-black px-3 py-1.5 rounded hover:bg-yellow-500 text-sm sm:text-base"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-yellow-400">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden on desktop) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 shadow-md flex flex-col items-center space-y-4 py-4 lg:hidden z-50">
          {/* Mobile Search Bar */}
          <div className="w-11/12 sm:w-3/4 mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full py-1.5 px-3 rounded-full bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Search products and categories"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} size="sm" />
              </button>
            </div>
          </div>
          <Link href="/" className={getLinkClass("/")} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/shop" className={getLinkClass("/shop")} onClick={() => setMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/about" className={getLinkClass("/about")} onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/help" className={getLinkClass("/help")} onClick={() => setMobileMenuOpen(false)}>
            Help
          </Link>
          {user ? (
            <>
              <div className="relative" ref={userMenuRef}>
                <button onClick={toggleUserMenu} className="flex items-center text-gray-300 hover:text-yellow-400">
                  <span>Hi, {getDisplayName()}!</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="ml-1 text-gray-300"
                    size="sm"
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Link href="/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-yellow-500"
                  size="lg"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-gray-300 hover:text-yellow-400 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-yellow-400 text-black px-3 py-1.5 rounded hover:bg-yellow-500 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;