import { useAuth } from "@/providers/AuthProvider";
import { UserRound } from "lucide-react";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
      <UserRound className="h-4 w-4" />
      <span className="text-sm font-medium">
        {user?.email?.split('@')[0]}
      </span>
    </div>
  );
};

export default Navigation;