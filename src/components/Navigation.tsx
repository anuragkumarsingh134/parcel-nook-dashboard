import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserName(data.name);
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
      <UserRound className="h-4 w-4" />
      <span className="text-sm font-medium">
        {userName || user?.email?.split('@')[0]}
      </span>
    </div>
  );
};

export default Navigation;