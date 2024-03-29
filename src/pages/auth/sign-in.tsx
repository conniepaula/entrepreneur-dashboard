import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: searchParams.get("email") ?? "" },
  });

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

  const handleSignIn = async (data: SignInForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await authenticate({ email: data?.email });
      toast.success(
        "A login link was sent to your email. Use it to access your account.",
        {
          action: { label: "Resend link", onClick: () => handleSignIn(data) },
        },
      );
    } catch (error) {
      toast.error(
        "There was an error generating your sign in link. Please try again.",
      );
    }
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
              className="h-12 w-full text-lg md:h-10 md:text-sm"
              type="submit"
            >
              Send Login Link
            </Button>
          </form>
          <div className="flex justify-center">
            <span className="text-lg text-muted-foreground md:text-sm">
              Don&apos;t have an account? Sign up{" "}
              <Link
                to="/sign-up"
                className="cursor-pointer text-primary underline underline-offset-4"
              >
                {" "}
                here
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
