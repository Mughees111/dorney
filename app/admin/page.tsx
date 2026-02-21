import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600 mt-1">Manage products</p>
        </Link>
        <Link
          href="/admin/categories"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600 mt-1">Manage categories</p>
        </Link>
        <Link
          href="/admin/hero"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900">Hero Slides</h2>
          <p className="text-sm text-gray-600 mt-1">Update hero section</p>
        </Link>
        <Link
          href="/admin/orders"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-600 mt-1">View orders</p>
        </Link>
      </div>
    </div>
  );
}
