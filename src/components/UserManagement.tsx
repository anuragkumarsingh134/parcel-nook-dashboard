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
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select(`
            id,
            email,
            status,
            user_roles (
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

        // Transform the data to match our UserProfile interface
        const transformedProfiles = (profiles || []).map((profile: any) => ({
          ...profile,
          user_roles: profile.user_roles || [] // Ensure we always have an array, even if empty
        }));

        console.log("Fetched users:", transformedProfiles); // Debug log
        return transformedProfiles as UserProfile[];
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