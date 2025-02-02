import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";

interface UserActionsProps {
  userId: string;
  onStatusUpdate: () => void;
}

const UserActions = ({ userId, onStatusUpdate }: UserActionsProps) => {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);

  const updateUserStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: newStatus })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Status updated successfully",
        description: `User has been ${newStatus}.`,
      });
      onStatusUpdate();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        description: "There was an error updating the user's status.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex gap-1 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        disabled={updating}
        onClick={() => updateUserStatus("approved")}
      >
        <UserCheck className="w-4 h-4 mr-1" />
        Approve
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={updating}
        onClick={() => updateUserStatus("rejected")}
      >
        <UserX className="w-4 h-4 mr-1" />
        Reject
      </Button>
    </div>
  );
};

export default UserActions;