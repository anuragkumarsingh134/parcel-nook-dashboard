import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showApprovalPending, setShowApprovalPending] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowApprovalPending(false);

    try {
      if (isLogin) {
        // Check user status before attempting to sign in
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('status')
          .eq('email', email)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData || profileData.status !== 'approved') {
          setShowApprovalPending(true);
          toast({
            title: "Account Not Approved",
            description: "Your account is pending approval. Please contact an administrator.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // If approved, attempt to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        navigate("/dashboard");
      } else {
        // Handle signup - no email verification
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined, // Disable email verification
          }
        });

        if (signUpError) throw signUpError;
        
        setShowApprovalPending(true);
        toast({
          title: "Sign Up Successful",
          description: "Your account is pending approval. An administrator will review your request.",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Fill in your details to create an account"}
          </p>
        </div>

        {showApprovalPending && (
          <Alert>
            <AlertDescription>
              Your account is pending approval. Please wait for an administrator to approve your account.
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
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : isLogin
              ? "Sign in"
              : "Create account"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;