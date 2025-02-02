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
          .select("id, email, status");

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          toast({
            title: "Error fetching users",
            description: "There was a problem loading the user list.",
            variant: "destructive",
          });
          throw profilesError;
        }

        const { data: userRoles, error: rolesError } = await supabase
          .from("user_roles")
          .select("user_id, role");

        if (rolesError) {
          console.error("Error fetching user roles:", rolesError);
          toast({
            title: "Error fetching user roles",
            description: "There was a problem loading user roles.",
            variant: "destructive",
          });
          throw rolesError;
        }

        const transformedProfiles = (profiles || []).map((profile: any) => {
          const userRolesForProfile = userRoles?.filter(
            (role) => role.user_id === profile.id
          ) || [];
          
          return {
            ...profile,
            user_roles: userRolesForProfile.map(role => ({ role: role.role }))
          };
        });

        console.log("Fetched users:", transformedProfiles);
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
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold p-6">User Management</h2>
      <div className="flex-1 overflow-x-hidden px-6">
        <UserTable users={users || []} onUpdate={refetch} />
      </div>
    </div>
  );
};

export default UserManagement;