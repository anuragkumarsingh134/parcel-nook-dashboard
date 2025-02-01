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
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowEmailConfirmation(false);

    try {
      if (isLogin) {
        // First attempt to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // If email not confirmed error, check if user is approved
          if (signInError.message.includes("Email not confirmed")) {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('status')
              .eq('email', email)
              .maybeSingle();

            if (profileError) throw profileError;

            // If user is approved, bypass email verification
            if (profileData?.status === 'approved') {
              const { error: retryError } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              
              if (retryError) throw retryError;
              navigate("/dashboard");
            } else {
              // If not approved or profile not found, show email confirmation message
              setShowEmailConfirmation(true);
              toast({
                title: "Account Not Approved",
                description: "Please check your email to confirm your account or contact an administrator.",
                variant: "destructive",
              });
            }
          } else {
            throw signInError;
          }
          return;
        }
        navigate("/dashboard");
      } else {
        // Handle signup
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setShowEmailConfirmation(true);
        toast({
          title: "Success",
          description: "Please check your email to confirm your account.",
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

  const handleResendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Confirmation email has been resent. Please check your inbox.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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

        {showEmailConfirmation && (
          <Alert>
            <AlertDescription className="space-y-4">
              <p>Please check your email to confirm your account before signing in.</p>
              <Button
                variant="outline"
                onClick={handleResendConfirmation}
                className="w-full"
              >
                Resend confirmation email
              </Button>
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