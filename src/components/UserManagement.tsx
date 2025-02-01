import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import UserTable from "./user-management/UserTable";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  email: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

const UserManagement = () => {
  const { toast } = useToast();

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        // Fetch all profiles and join with user_roles using the user ID
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select(`
            id,
            email,
            status,
            user_roles!user_roles_user_id_fkey (
              role
            )
          `);

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          toast({
            title: "Error fetching users",
            description: "There was a problem loading the user list.",
            variant: "destructive",
          });
          throw profilesError;
        }

        console.log("Fetched users:", profiles); // Debug log
        return (profiles || []) as UserProfile[];
      } catch (error) {
        console.error("Error in user management query:", error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <UserTable users={users || []} onUpdate={refetch} />
    </div>
  );
};

export default UserManagement;