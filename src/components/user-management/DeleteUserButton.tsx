import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteUserButtonProps {
  userId: string;
  onUpdate: () => void;
}

const DeleteUserButton = ({ userId, onUpdate }: DeleteUserButtonProps) => {
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      onUpdate();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDeleteUser}
      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DeleteUserButton;