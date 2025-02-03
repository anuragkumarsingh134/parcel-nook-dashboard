import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatusBadge from "./StatusBadge";
import UserRoleSelect from "./UserRoleSelect";
import UserActions from "./UserActions";
import DeleteUserButton from "./DeleteUserButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Check, X } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

interface UserTableRowProps {
  user: UserProfile;
  onUpdate: () => void;
}

const UserTableRow = ({ user, onUpdate }: UserTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const { toast } = useToast();

  const handleUpdateName = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ name: newName })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Name updated",
        description: "The user's name has been updated successfully.",
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        title: "Error",
        description: "Failed to update the user's name. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setNewName(user.name);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2 w-full">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="max-w-[200px]"
                placeholder="Enter name"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleUpdateName}
                className="h-8 w-8 text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <span className="font-medium text-lg" title={user.email}>
                {user.name}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          <StatusBadge status={user.status} />
          
          <UserRoleSelect
            userId={user.id}
            currentRole={user.user_roles?.[0]?.role}
            isDisabled={user.status !== "approved"}
            onRoleUpdate={onUpdate}
          />

          <div className="flex flex-wrap gap-2">
            {user.status === "pending" && (
              <UserActions userId={user.id} onStatusUpdate={onUpdate} />
            )}
            {user.user_roles?.[0]?.role !== "admin" && (
              <DeleteUserButton userId={user.id} onUpdate={onUpdate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTableRow;