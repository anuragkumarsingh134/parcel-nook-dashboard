import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthForm from "./AuthForm";

interface SignUpFormProps {
  onToggle: () => void;
}

const SignUpForm = ({ onToggle }: SignUpFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showApprovalPending, setShowApprovalPending] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowApprovalPending(false);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      setShowApprovalPending(true);
      toast({
        title: "Sign Up Successful",
        description: "Your account has been created. An administrator will need to approve your account before you can sign in.",
      });
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
    <>
      {showApprovalPending && (
        <Alert>
          <AlertDescription>
            Your account is pending approval. An administrator will need to approve your account before you can sign in.
          </AlertDescription>
        </Alert>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        onSubmit={handleSignUp}
        submitText="Create account"
        toggleText="Already have an account? Sign in"
        onToggle={onToggle}
      />
    </>
  );
};

export default SignUpForm;