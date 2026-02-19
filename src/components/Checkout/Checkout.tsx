import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import cartId from '../Cart/Cart'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from '../ui/field'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { CheckoutAction } from '@/actions/addToCartAction'
import { ShippingAddress } from '../interfaces/CartInterfaces'
import { Loader2 } from 'lucide-react'
import { strict } from 'assert'

export default function Checkout({ cartId }: { cartId: string }) {

    const [isLoading, setIsLoading] = useState(false)

    const city = useRef<null | HTMLInputElement>(null);
    const details = useRef<null | HTMLInputElement>(null);
    const phone = useRef<null | HTMLInputElement>(null);

    async function checkout() {
        setIsLoading(true);
        const shippingAddress: ShippingAddress = {
            city: city.current?.value as string,
            details: details.current?.value as string,
            phone: phone.current?.value as string
        }

        const response= await CheckoutAction(cartId, shippingAddress);
        if (response?.status == 'success') {
            location.href = response.session.url;
        }

        setIsLoading(false);
    }
    return <>
        <Dialog>

            <DialogTrigger asChild>
                <Button className="w-full rounded-lg cursor-pointer" disabled={cartId == null}>Checkout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add shipping address</DialogTitle>
                    <DialogDescription>
                        please,add your shipping address
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="city">City</Label>
                        <Input ref={city} id="city" name="city" defaultValue="Cairo" />
                    </Field>
                    <Field>
                        <Label htmlFor="details">details</Label>
                        <Input ref={details} id="details" name="details" defaultValue="maadi" />
                    </Field>
                    <Field>
                        <Label htmlFor="phone">phone</Label>
                        <Input ref={phone} id="phone" name="phone" defaultValue="01234567890" />
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => checkout()} type="submit" disabled={isLoading}>{isLoading && <Loader2 className='animate-spin' />} Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}
