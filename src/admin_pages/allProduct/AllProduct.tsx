import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/redux/features/admin/products";
import { Edit, Trash2, Plus, Package } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  // ✅ FIX: Casting as any[] to solve .map and .length errors
  const products = ((data as any)?.data as any[]) || [];
  console.log(products);
  const totalCount = (data as any)?.meta.totalCount || 0;
  console.log(data);

  // ✅ SweetAlert2 Delete Handler
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F5E3B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[32px]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Product has been removed.",
            icon: "success",
            confirmButtonColor: "#1F5E3B",
            customClass: { popup: "rounded-[32px]" },
          });
        } catch (err: any) {
          toast.error(err?.data?.message || "Failed to delete product");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg text-[#1F5E3B]"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-20 text-center text-red-500 font-bold">
        Error loading products!
      </div>
    );

  return (
    <div className="p-4 lg:p-8">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1A2E1A] flex items-center gap-2">
            <Package className="text-[#1F5E3B]" /> ALL PRODUCTS
          </h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            Inventory & Marketplace Control Center
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="btn bg-[#1F5E3B] hover:bg-[#164129] text-white border-none rounded-2xl px-6 shadow-lg shadow-green-100 transition-all active:scale-95"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      {/* --- Stats Card --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="p-4 bg-green-50 text-[#1F5E3B] rounded-2xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Total Inventory
            </p>
            <p className="text-2xl font-black text-gray-800 tracking-tighter">
              {totalCount} Items
            </p>
          </div>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-separate border-spacing-0">
            <thead className="bg-[#F8FAF8]">
              <tr className="border-none text-gray-400 font-black text-[10px] uppercase tracking-[0.15em]">
                <th className="py-6 pl-10">Product Details</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Availability</th>
                <th className="text-center pr-10">Management</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {products.map((product: any) => (
                <tr
                  key={product._id}
                  className="group hover:bg-green-50/40 transition-all duration-300"
                >
                  <td className="py-5 pl-10">
                    <div className="flex items-center gap-4">
                      <div className="avatar shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="mask mask-squircle w-14 h-14 bg-gray-50">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${product.images?.[0]}`}
                            alt={product.title}
                            className="object-cover"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://via.placeholder.com/150")
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#1A2E1A] line-clamp-1 group-hover:text-[#1F5E3B] transition-colors">
                          {product.title}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          ID: {product._id?.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge bg-gray-50 border-none font-bold text-[10px] text-gray-500 py-3.5 px-4 rounded-xl uppercase tracking-wider">
                      {product.category?.title || "N/A"}
                    </span>
                  </td>

                  <td>
                    <div className="font-black text-[#1A2E1A]">
                      <span className="text-xs mr-0.5">¥</span>
                      {product.price?.toLocaleString()}
                      {product.discountPrice && (
                        <span className="block text-[10px] text-red-400 line-through opacity-70">
                          ¥{product.discountPrice}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      {product.stock === "available" ? (
                        <span className="text-[10px] font-black text-green-600 flex items-center gap-1.5 uppercase tracking-tighter">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          Instock
                        </span>
                      ) : (
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-tighter flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-400"></span>
                          Sold Out
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-gray-300 italic tracking-wide">
                        {product.stockQuantity || 0} units left
                      </span>
                    </div>
                  </td>

                  <td className="pr-10">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500 rounded-2xl transition-all shadow-sm"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-24 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-black text-gray-800 tracking-tight">
              No Products Found
            </h3>
            <p className="text-sm text-gray-400 mt-1 mb-8">
              Your inventory is currently empty.
            </p>
            <Link
              to="/admin/add-product"
              className="btn bg-[#1F5E3B] text-white border-none rounded-2xl px-8"
            >
              Add First Item
            </Link>
          </div>
        )}

        {/* --- Pagination --- */}
        <div className="p-8 bg-[#F8FAF8]/50 flex items-center justify-between border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Displaying {products.length} of {totalCount} Records
          </p>
          <div className="flex gap-2">
            <button className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm">
              &lt;
            </button>
            <button className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
