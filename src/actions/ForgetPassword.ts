export async function ForgetPassword(email: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            "Content-type": "application/json",
        }
    }
    )
    const data = await response.json();
    return data

}

export async function VerifyResetCode(resetCode: string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: 'POST',
        body: JSON.stringify({ resetCode }),
        headers: {
            "Content-type": "application/json",
        }
    }
    )
    const data = await response.json();
    return data
}

export async function ResetPassword(email: string, newPassword: string) {

    const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword,
            }),
        }
    )
    const data = await res.json()
    return data
}