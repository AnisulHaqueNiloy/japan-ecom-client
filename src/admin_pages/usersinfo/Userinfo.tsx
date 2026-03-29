
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Mail,  } from "lucide-react";
import { useGetAllUsersQuery } from "@/redux/features/authApi";

function Userinfo() {
  const { data: userData, isLoading } = useGetAllUsersQuery(undefined);
  const userlist = userData?.data || [];

  const users = userlist.filter((item:any )=>item.role !=="ADMIN")

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A2E1A] uppercase tracking-tight flex items-center gap-2">
            <User className="text-[#1F5E3B]" /> Registered Users
          </h1>
          <p className="text-gray-500 text-sm font-medium">Manage and view all registered customers.</p>
        </div>
        <Badge variant="outline" className="bg-[#1F5E3B]/10 text-[#1F5E3B] border-[#1F5E3B]/20 font-bold">
          Total: {users.length}
        </Badge>
      </div>

      <div className="rounded-[2rem] border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">User Details</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">Email Address</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">Role</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-gray-400">Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id} className="group hover:bg-gray-50/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold uppercase text-xs">
                      {user.name.slice(0, 2)}
                    </div>
                    <span className="font-bold text-[#1A2E1A]">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={14} />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={user.role === 'admin' 
                      ? "bg-amber-500 hover:bg-amber-600" 
                      : "bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    {user.role || 'customer'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400 text-xs font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="text-center py-20">
            <User size={40} className="mx-auto text-gray-200 mb-2" />
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Userinfo;