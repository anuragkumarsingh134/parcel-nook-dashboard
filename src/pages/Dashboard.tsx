import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";
import ParcelTable from "@/components/ParcelTable";
import UserManagement from "@/components/UserManagement";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { userRole, signOut } = useAuth();
  const { toast } = useToast();
  const isAdmin = userRole === "admin";

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Parcel Management</h1>
        <div className="flex gap-4">
          <Link to="/add-parcel">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Parcel
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      <ParcelTable />
      
      {isAdmin && (
        <div className="mt-12">
          <UserManagement />
        </div>
      )}
    </div>
  );
};

export default Dashboard;