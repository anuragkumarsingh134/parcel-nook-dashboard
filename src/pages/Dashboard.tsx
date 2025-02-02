import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut, Users } from "lucide-react";
import ParcelTable from "@/components/ParcelTable";
import UserManagement from "@/components/UserManagement";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { userRole, signOut } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const isAdmin = userRole === "admin";
  const isEditor = userRole === "editor";
  const canManageParcels = isAdmin || isEditor;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Parcel Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your parcels and shipments efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {canManageParcels && (
              <Link to="/add-parcel">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {!isMobile && "Add New Parcel"}
                  {isMobile && "Add"}
                </Button>
              </Link>
            )}
            {isAdmin && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/50"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {!isMobile && "Manage Users"}
                    {isMobile && "Users"}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>User Management</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <UserManagement />
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <Button 
              variant="outline"
              onClick={handleSignOut}
              className="border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-900/50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {!isMobile && "Sign Out"}
              {isMobile && "Exit"}
            </Button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 animate-fade-in">
          <ParcelTable userRole={userRole} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;