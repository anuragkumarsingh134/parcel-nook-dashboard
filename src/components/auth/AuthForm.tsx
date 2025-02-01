import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  toggleText: string;
  onToggle: () => void;
}

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit,
  submitText,
  toggleText,
  onToggle,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
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
        {isLoading ? "Loading..." : submitText}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggle}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {toggleText}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;