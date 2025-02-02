import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showApprovalPending, setShowApprovalPending] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowApprovalPending(false);

    try {
      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError?.message?.includes("Invalid login credentials")) {
        // If login fails, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        setShowApprovalPending(true);
        toast({
          title: "Account Created",
          description: "Your account has been created and is pending approval.",
        });
        return;
      }

      if (signInError) throw signInError;

      // After successful sign in, check user's profile status
      const { data: profileData } = await supabase
        .from("profiles")
        .select("status")
        .eq("id", signInData.user.id)
        .single();

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", signInData.user.id)
        .single();

      // Allow access if user is admin or if their account is approved
      if (roleData?.role === "admin" || profileData?.status === "approved") {
        navigate("/dashboard");
      } else {
        // Sign out if not approved and not admin
        await supabase.auth.signOut();
        setShowApprovalPending(true);
        throw new Error("Your account is pending approval. Please contact an administrator.");
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <DarkModeToggle />
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Welcome</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>

        {showApprovalPending && (
          <Alert>
            <AlertDescription>
              Your account is pending approval. Please contact an administrator to get your account approved.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;