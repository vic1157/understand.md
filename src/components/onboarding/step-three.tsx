"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { StepThreeSchema, StepThreeSchemaType } from "@/lib/validators/step-three";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StepThreeProps {
    nextStep: () => void;
}

const StepThree = ({ nextStep }: StepThreeProps) => {
    const form = useForm<StepThreeSchemaType>({
        resolver: zodResolver(StepThreeSchema),
        defaultValues: {
            medicationName: "",
            dosage: "",
            frequency: "DAILY",
            adherence: "ALWAYS",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-three"],
        mutationFn: async (data: StepThreeSchemaType) => {
            const response = await axios.post("/api/onboarding/step-three", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Medication data saved successfully!");
            nextStep(); // Move to the next step
        },
        onError: () => {
            toast.error("Failed to save medication data");
        },
    });

    const onSubmit = (data: StepThreeSchemaType) => {
        mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-6 w-full h-full relative"
                >
                    {/* Medication Name */}
                    <FormField
                        control={form.control}
                        name="medicationName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="medicationName">Medication Name</FormLabel>
                                <Input
                                    {...field}
                                    id="medicationName"
                                    disabled={isPending}
                                    placeholder="Ex: Paracetamol"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Dosage */}
                    <FormField
                        control={form.control}
                        name="dosage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="dosage">Dosage</FormLabel>
                                <Input
                                    {...field}
                                    id="dosage"
                                    disabled={isPending}
                                    placeholder="Ex: 500mg"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Frequency */}
                    <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="frequency">Frequency</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map(
                                            (freq) => (
                                                <SelectItem key={freq} value={freq}>
                                                    {freq.toLowerCase()}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Adherence */}
                    <FormField
                        control={form.control}
                        name="adherence"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="adherence">Adherence</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Adherence" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"].map(
                                            (adhere) => (
                                                <SelectItem key={adhere} value={adhere}>
                                                    {adhere.toLowerCase()}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <div className="flex items-center justify-end w-full mt-10 gap-6">
                        <p className="text-xs text-muted-foreground">
                            You can update these settings in the dashboard
                        </p>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-24 gap-x-2"
                        >
                            Next
                            {isPending ? (
                                <LoaderIcon className="animate-spin h-4 w-4" />
                            ) : (
                                <ArrowRightIcon className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default StepThree;
