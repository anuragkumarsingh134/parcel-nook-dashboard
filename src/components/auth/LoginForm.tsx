import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "./AuthForm";

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm = ({ onToggle }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, attempt to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // After successful sign in, get the user's role and profile status
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("No user data found");

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .single();

      const { data: profileData } = await supabase
        .from("profiles")
        .select("status")
        .eq("id", userData.user.id)
        .single();

      // Allow access if user is admin or if their account is approved
      if (roleData?.role === "admin" || profileData?.status === "approved") {
        navigate("/dashboard");
      } else {
        // Sign out if not approved and not admin
        await supabase.auth.signOut();
        toast({
          title: "Account Not Approved",
          description: "Your account is pending approval. Please contact an administrator.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
      onSubmit={handleLogin}
      submitText="Sign in"
      toggleText="Don't have an account? Sign up"
      onToggle={onToggle}
    />
  );
};

export default LoginForm;