import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  const handleSignIn = async (data: SignInForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!data.email) {
      toast.error(
        "There was an error generating your sign in link. Please try again.",
      );
      return;
    }
    toast.success(
      "A login link was sent to your email. Use it to access your account.",
      {
        action: { label: "Resend link", onClick: () => handleSignIn(data) },
      },
    );
  };
  return (
    <>
      <Helmet title="Login" />
      <div className="overflow-y-clip p-4 pb-32 md:min-h-fit md:p-8 md:pb-8">
        {/* TODO: Define width between 80 and 96 in tailwind config */}
        <div className="flex w-[350px] min-w-full flex-col justify-center gap-6 md:w-96">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-2xl">
              Access Portal
            </h1>
            <p className="text-xl text-muted-foreground md:text-sm">
              Enter your email to access your dashboard
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg md:text-sm" htmlFor="email">
                Email address
              </Label>
              <Input
                className="h-12 md:h-10"
                id="email"
                type="email"
                {...register("email")}
              />
            </div>
            <Button
              disabled={isSubmitting}
              className="md:text-md h-12 w-full text-lg md:h-10"
              type="submit"
            >
              Send Login Link
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
