import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  getRepresentedBusiness,
  GetRepresentedBusinessResponse,
} from "@/api/get-represented-business";
import { updateProfile } from "@/api/update-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const businessProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type BusinessProfileForm = z.infer<typeof businessProfileSchema>;

export function BusinessProfileDialog() {
  const { data: business } = useQuery({
    queryKey: ["represented-restaurant"],
    queryFn: getRepresentedBusiness,
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BusinessProfileForm>({
    resolver: zodResolver(businessProfileSchema),
    values: {
      name: business?.name ?? "",
      description: business?.description ?? "",
    },
  });

  const updateRepresentedBusinessCache = (variables: BusinessProfileForm) => {
    const { name, description } = variables;
    const cached = queryClient.getQueryData<GetRepresentedBusinessResponse>([
      "represented-business",
    ]);
    if (cached) {
      queryClient.setQueryData<GetRepresentedBusinessResponse>(
        ["represented-business"],
        {
          ...cached,
          name,
          description,
        },
      );
    }
    return { cached };
  };

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: (variables) => {
      const { name, description } = variables;
      const { cached } = updateRepresentedBusinessCache({ name, description });
      return { profilePreviousValues: cached };
    },
    onError: (_, __, context) => {
      if (context?.profilePreviousValues) {
        updateRepresentedBusinessCache(context.profilePreviousValues);
      }
    },
  });

  const handleUpdateProfile = async (data: BusinessProfileForm) => {
    const { name, description } = data;
    try {
      await updateProfileFn({ name, description });

      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Business Profile</DialogTitle>
        <DialogDescription>
          Update your business profile to ensure the information displayed to
          your clients is accurate.
        </DialogDescription>
      </DialogHeader>
      <form action="" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
