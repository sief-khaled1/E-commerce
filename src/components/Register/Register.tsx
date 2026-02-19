"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { emailSchema, nameSchema, PasswordSchema, phoneSchema } from "@/helpers/schema"
import { registerFields } from "@/helpers/RegisterData"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"

const formSchema = z.object({
    email: emailSchema.nonempty("email is required"),
    password: PasswordSchema.nonempty("password is required"),
    rePassword: z.string().nonempty("confirm password is required"),
    name: nameSchema.nonempty("name is required"),
    phone: phoneSchema.nonempty("phone number is required"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords are not the same",
    path: ["rePassword"],
})

export type formData = z.infer<typeof formSchema>

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    })

    async function onSubmit(data: formData) {
        setIsLoading(true)

        try {
            const response = await fetch("/api/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success("Signup successful!")
                router.push("/login")
            } else {
                toast.error(result.error || "Signup failed")
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
        }

        setIsLoading(false)
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {registerFields.map((item) => (
                            <Controller
                                key={item.name}
                                name={item.name as keyof formData}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={"form-rhf-demo-" + item.name}>
                                            {item.label}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type={item.type}
                                            id={"form-rhf-demo-" + item.name}
                                            placeholder={item.placeholder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        ))}
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isLoading} type="submit" form="form-rhf-demo">
                        {isLoading && <Loader2 className="animate-spin" />}
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
