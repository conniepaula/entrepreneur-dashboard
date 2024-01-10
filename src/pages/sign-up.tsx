import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpFormSchema = z
  .object({
    businessName: z.string().min(5),
    representativeName: z.string().min(3),
    email: z.string().email().min(6),
    phoneNumber: z.string(),
    acceptedTermsAndConditions: z.boolean(),
  })
  .required();

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const form = useForm<SignUpForm>({ resolver: zodResolver(signUpFormSchema) });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSignUp = async (data: SignUpForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!data) {
      toast.error(
        "Account could not be created successfully. Please try again.",
      );
      return;
    }
    toast.success("Welcome! We are so excited to have you here.", {
      action: { label: "Login", onClick: () => navigate("/sign-in") },
    });
  };
  return (
    <>
      <Helmet title="Sign Up" />
      <div className="mt-6 overflow-y-clip p-4 pb-32 md:mt-0 md:min-h-fit md:p-8 md:pb-8">
        {/* TODO: Define width between 80 and 96 in tailwind config */}
        <div className="flex w-[350px] min-w-full flex-col justify-center gap-6 md:w-96">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-2xl">
              Create An Account
            </h1>
            <p className="text-xl text-muted-foreground md:text-sm">
              Unlock powerful business analytics tools for free. Fill out the
              form below to get started!
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-2">
              <div className="space-y-2">
                <Label className="text-lg md:text-sm" htmlFor="businessName">
                  Business Name
                </Label>
                <Input
                  className="h-12 md:h-10"
                  id="businessName"
                  type="text"
                  {...register("businessName")}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-lg md:text-sm"
                  htmlFor="representativeName"
                >
                  Your Name
                </Label>
                <Input
                  className="h-12 md:h-10"
                  id="representativeName"
                  type="text"
                  {...register("representativeName")}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg md:text-sm" htmlFor="email">
                  Work email
                </Label>
                <Input
                  className="h-12 md:h-10"
                  id="email"
                  type="text"
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg md:text-sm" htmlFor="phoneNumber">
                  Phone number
                </Label>
                <Input
                  className="h-12 md:h-10"
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                />
              </div>
              <FormField
                control={form.control}
                name="acceptedTermsAndConditions"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 py-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="ml-0 mt-0 leading-none">
                      <FormLabel className="text-lg md:text-sm">
                        Agree to{" "}
                        <a className="cursor-pointer text-primary">
                          terms and conditions
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                className="h-12 w-full text-lg md:h-10 md:text-sm"
                type="submit"
              >
                Create Account
              </Button>
            </form>
          </Form>
          <div className="flex justify-center">
            <span className="text-lg text-muted-foreground md:text-sm">
              Already have an account? Sign in{" "}
              <Link
                to="/sign-in"
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
