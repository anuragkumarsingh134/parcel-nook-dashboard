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
        // First fetch all profiles
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("*");

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          toast({
            title: "Error fetching users",
            description: "There was a problem loading the user list.",
            variant: "destructive",
          });
          throw profilesError;
        }

        // Then fetch roles for each profile
        const profilesWithRoles = await Promise.all(
          profiles.map(async (profile) => {
            try {
              const { data: roles, error: rolesError } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", profile.id);

              if (rolesError) {
                console.error("Error fetching roles for user:", profile.id, rolesError);
                throw rolesError;
              }

              return {
                ...profile,
                user_roles: roles || [],
              };
            } catch (error) {
              console.error("Error processing user roles:", error);
              return {
                ...profile,
                user_roles: [],
              };
            }
          })
        );

        console.log("Fetched users:", profilesWithRoles); // Debug log
        return profilesWithRoles as UserProfile[];
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