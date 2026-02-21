"use client"

import { useState } from "react"
import { ForgetPassword, ResetPassword, VerifyResetCode } from "@/actions/ForgetPassword"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function ForgetPasswordData() {

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<"email" | "code" | "password">("email")
    const [email, setEmail] = useState("")
    const [resetCode, setResetCode] = useState("")
    const [newPassword, setNewPassword] = useState("")

    async function forgetPassword(email: string) {
        setIsLoading(true)
        const data = await ForgetPassword(email)
        setIsLoading(false)

        if (data.statusMsg === "success") {
            toast.success("Reset code sent to your email 📩")
            setStep("code")
        } else {
            toast.error("Failed to send reset code ❌")
        }
    }

    async function verifyCode(resetCode: string) {
        setIsLoading(true)
        const data = await VerifyResetCode(resetCode)
        setIsLoading(false)

        if (data.status === "Success") {
            toast.success("Code verified")
            setStep("password")
        } else {
            toast.error("Invalid code")
        }
    }

    async function Reset(email: string, newPassword: string) {
        setIsLoading(true)
        const data = await ResetPassword(email, newPassword)
        setIsLoading(false)

        if (data.token) {
            toast.success("Password changed successfully")
            setStep("email")
            setEmail("")
            setResetCode("")
            setNewPassword("")
            setOpen(false)
        } else {
            toast.error("Failed to reset password")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <p
                    onClick={() => setOpen(true)}
                    className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                >
                    Forgot your password?
                </p>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Reset password</DialogTitle>
                </DialogHeader>

                <FieldGroup>
                    {step === "email" && (
                        <Field>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                            />
                        </Field>
                    )}

                    {step === "code" && (
                        <Field>
                            <Label>Reset Code</Label>
                            <Input
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                                placeholder="Enter code from email"
                            />
                        </Field>
                    )}

                    {step === "password" && (
                        <Field>
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Field>
                    )}
                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    {step === "email" && (
                        <Button disabled={isLoading} onClick={() => forgetPassword(email)}>
                            {isLoading && <Loader2 className="animate-spin mr-2" />}
                            Send reset code
                        </Button>
                    )}

                    {step === "code" && (
                        <Button disabled={isLoading} onClick={() => verifyCode(resetCode)}>
                            {isLoading && <Loader2 className="animate-spin mr-2" />}
                            Verify code
                        </Button>
                    )}

                    {step === "password" && (
                        <Button disabled={isLoading} onClick={() => Reset(email, newPassword)}>
                            {isLoading && <Loader2 className="animate-spin mr-2" />}
                            Reset password
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}