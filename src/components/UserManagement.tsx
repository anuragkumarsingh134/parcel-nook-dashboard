import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import UserTable from "./user-management/UserTable";

interface UserProfile {
  id: string;
  email: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

const UserManagement = () => {
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }

      const profilesWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roles, error: rolesError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", profile.id);

          if (rolesError) {
            console.error("Error fetching roles:", rolesError);
            throw rolesError;
          }

          return {
            ...profile,
            user_roles: roles || [],
          };
        })
      );

      return profilesWithRoles as UserProfile[];
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