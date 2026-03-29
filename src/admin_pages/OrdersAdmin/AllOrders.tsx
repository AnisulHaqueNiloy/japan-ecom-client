
// API hooks gulo check kore niben
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Truck,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Loader2,
  Package,
} from "lucide-react";
import Swal from "sweetalert2";
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/admin/adminOrderApi";
import { Link } from "react-router-dom";
// const IMG_URL = import.meta.env.VITE_API_URL
const AllOrders = () => {
  const {
    data: ordersData,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery(undefined);
  const [updateStatus] =
    useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const orders = ordersData?.data || [];
  console.log(orders)

  // Status Badge Colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-600 border-amber-200"
          >
            Pending
          </Badge>
        );
      case "Confirmed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            Confirmed
          </Badge>
        );
      case "Shipped":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-600 border-purple-200"
          >
            Shipped
          </Badge>
        );
      case "Delivered":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-600 border-emerald-200 font-bold"
          >
            Delivered
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Order marked as ${newStatus}`,
        showConfirmButton: false,
        timer: 2000,
      });
      refetch();
    } catch (err: any) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteOrder(id).unwrap();
        Swal.fire("Deleted!", "Order has been removed.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to delete order", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] uppercase tracking-tight flex items-center gap-2">
            <Package size={28} className="text-[#1F5E3B]" /> Order Management
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Track, manage and update all customer orders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#1F5E3B]/10 px-4 py-2 rounded-xl border border-[#1F5E3B]/20">
            <span className="text-xs font-bold text-[#1F5E3B] uppercase">
              Total Orders: {orders.length}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[100px] font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Order ID
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Customer & Phone
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Items
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Total Price
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Status
              </TableHead>
              <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest text-gray-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow
                key={order._id}
                className="group hover:bg-gray-50/30 transition-colors"
              >
                <TableCell className="font-mono text-xs text-gray-400">
                  #{order._id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1A2E1A]">
                      {order.shippingAddress?.phone}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">
                      {order.shippingAddress?.city}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {order.orderItems
                      .slice(0, 3)
                      .map((item: any, i: number) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
                          title={item.name}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1F5E3B] text-[10px] font-bold text-white">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-black text-[#1A2E1A]">
                  ¥{order.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-[#1F5E3B]/10 hover:text-[#1F5E3B]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-2xl p-2 font-sans border-gray-100 shadow-xl"
                    >
                      <DropdownMenuLabel className="text-[10px] uppercase font-black text-gray-400 mb-1">
                        Update Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(order._id, "Confirmed")
                        }
                        className="rounded-lg gap-2 cursor-pointer"
                      >
                        <CheckCircle size={14} className="text-blue-500" />{" "}
                        Confirm Order
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(order._id, "Shipped")}
                        className="rounded-lg gap-2 cursor-pointer"
                      >
                        <Truck size={14} className="text-purple-500" /> Mark as
                        Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(order._id, "Delivered")
                        }
                        className="rounded-lg gap-2 cursor-pointer"
                      >
                        <CheckCircle size={14} className="text-emerald-500" />{" "}
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(order._id, "Cancelled")
                        }
                        className="rounded-lg gap-2 cursor-pointer text-red-500"
                      >
                        <XCircle size={14} /> Cancel Order
                      </DropdownMenuItem>

                      <div className="h-px bg-gray-100 my-1" />

                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-blue-600">
                        <Link to={`/admin/orders/${order._id}`}>
                        <Eye size={14} /> View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(order._id)}
                        className="rounded-lg gap-2 cursor-pointer text-red-600 font-bold"
                      >
                        <Trash2 size={14} /> Delete Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.length === 0 && (
          <div className="text-center py-20 bg-white">
            <Package size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              No orders found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
