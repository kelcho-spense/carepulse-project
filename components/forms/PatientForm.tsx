"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import { userFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

export enum FormFieldsType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


export default function PatientForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof userFormValidation>>({
        resolver: zodResolver(userFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name, email, phone }: z.infer<typeof userFormValidation>) {
        setIsLoading(true)
        try {
            // alert(`${name} ${email} ${phone}`)
            const userData = { name, email, phone }

            // connect to backend
            const user = await createUser(userData);
           
            if (user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <p></p>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldsType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldsType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="JohnDoe@example.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldsType.PHONE_INPUT}
                    name="phone"
                    label="Phone Number"
                    placeholder="(+254) 712345678"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <SubmitButton isLoading={isLoading}> Get Started </SubmitButton>
            </form>
        </Form>
    )
}
