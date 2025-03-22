// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface BreadcrumbItem {
//   name: string;
//   href: string;
// }

// export default function Breadcrumbs() {
//   const pathname = usePathname();

//   // Hide breadcrumbs on the homepage
//   if (pathname === "/") return null;

//   // Generate breadcrumb items based on the current pathname
//   const generateBreadcrumbs = (): BreadcrumbItem[] => {
//     const crumbs: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

//     // Split the pathname into segments
//     const pathSegments = pathname.split("/").filter((segment) => segment);

//     // Custom logic for specific routes
//     if (pathSegments[0] === "products" && pathSegments.length === 2) {
//       // For /products/[id], we don't want a "Products" page link
//       // Instead, show "Home > Product Details"
//       crumbs.push({ name: "Product Details", href: pathname });
//     } else if (pathSegments[0] === "order" && pathSegments[1] === "summary") {
//       // For /order/summary, we don't want an "Order" page link
//       // Instead, show "Home > Order Summary"
//       crumbs.push({ name: "Order Summary", href: pathname });
//     } else {
//       // Default logic for other routes
//       pathSegments.forEach((segment, index) => {
//         const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
//         const name = segment
//           .split("-")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ");
//         crumbs.push({ name, href });
//       });
//     }

//     return crumbs;
//   };

//   const breadcrumbs = generateBreadcrumbs();

//   return (
//     <nav className="py-2" aria-label="Breadcrumb">
//       <ol className="flex space-x-1 text-sm text-gray-500 pl-4 sm:pl-6 lg:pl-8">
//         {breadcrumbs.map((crumb, index) => (
//           <li key={crumb.href} className="flex items-center">
//             {index < breadcrumbs.length - 1 ? (
//               <>
//                 <Link href={crumb.href} className="hover:text-yellow-500">
//                   {crumb.name}
//                 </Link>
//                 <span className="mx-2">&gt;</span>
//               </>
//             ) : (
//               <span className="text-yellow-500 font-medium">{crumb.name}</span>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  productName?: string;
}

export default function Breadcrumbs({ productName }: BreadcrumbsProps = {}) {
  const pathname = usePathname();

  // Hide breadcrumbs on the homepage
  if (pathname === "/") return null;

  // Generate breadcrumb items based on the current pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

    // Split the pathname into segments
    const pathSegments = pathname.split("/").filter((segment) => segment);

    // Custom logic for specific routes
    if (pathSegments[0] === "products" && pathSegments.length === 2) {
      // For /products/[id], show "Home > Product Details > [Product Name]"
      crumbs.push({ name: "Product Details", href: `/products/${pathSegments[1]}` });
      if (productName) {
        crumbs.push({ name: productName, href: pathname });
      }
    } else if (pathSegments[0] === "order" && pathSegments[1] === "summary") {
      // For /order/summary, show "Home > Order Summary"
      crumbs.push({ name: "Order Summary", href: pathname });
    } else {
      // Default logic for other routes (e.g., /cart, /products)
      pathSegments.forEach((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const name = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        crumbs.push({ name, href });
      });
    }

    // Deduplicate crumbs (as a safeguard)
    const seenNames = new Set<string>();
    return crumbs.filter((crumb) => {
      if (seenNames.has(crumb.name)) {
        return false;
      }
      seenNames.add(crumb.name);
      return true;
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="py-2" aria-label="Breadcrumb">
      <ol className="flex space-x-1 text-sm text-gray-500">
        {breadcrumbs.map((crumb, index) => (
          <li key={`${crumb.href}-${index}`} className="flex items-center">
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href} className="hover:text-yellow-500">
                  {crumb.name}
                </Link>
                <span className="mx-2">&gt;</span>
              </>
            ) : (
              <span className="text-yellow-500 font-medium">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}