"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldsType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, Doctors, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader";




export default function RegisterForm({ user }: { user: User }) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>

                    {/* NAME */}

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldsType.INPUT}
                        name="name"

                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    {/* EMAIL & PHONE */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="email"
                            label="Email address"
                            placeholder="johndoe@gmail.com"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                    {/* BirthDate & Gender */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of birth"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option, i) => (
                                            <div key={option + i} className="radio-group">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>

                    {/* Address & Occupation */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="Tom Mboya street, Nairobi"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder=" Software Engineer"
                        />
                    </div>
                    {/* Emergency Contact Name & Emergency Contact Number */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="Guardian's name"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.PHONE_INPUT}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency contact number"
                            placeholder="(254) 123-4567"
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>

                    {/* PRIMARY CARE PHYSICIAN */}
                    <CustomFormField
                        fieldType={FormFieldsType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary care physician"
                        placeholder="Select a physician"
                    >
                        {Doctors.map((doctor, i) => (
                            <SelectItem key={doctor.name + i} value={doctor.name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    {/* INSURANCE & POLICY NUMBER */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="insuranceProvider"
                            label="Insurance provider"
                            placeholder="BlueCross BlueShield"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.INPUT}
                            control={form.control}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ABC123456789"
                        />
                    </div>

                    {/* ALLERGY & CURRENT MEDICATIONS */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.TEXTAREA}
                            control={form.control}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="Peanuts, Penicillin, Pollen"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.TEXTAREA}
                            control={form.control}
                            name="currentMedication"
                            label="Current medications"
                            placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
                        />
                    </div>

                    {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldsType.TEXTAREA}
                            control={form.control}
                            name="familyMedicalHistory"
                            label=" Family medical history (if relevant)"
                            placeholder="Mother had Mitochondrial Disorders, Father has hypertension"
                        />

                        <CustomFormField
                            fieldType={FormFieldsType.TEXTAREA}
                            control={form.control}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
                        />
                    </div>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verfication</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldsType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select identification type"
                    >
                        {IdentificationTypes.map((type, i) => (
                            <SelectItem key={type + i} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldsType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="123456789"
                    />

                    <CustomFormField
                        fieldType={FormFieldsType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned Copy of Identification Document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldsType.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to receive treatment for my health condition."
                    />

                    <CustomFormField
                        fieldType={FormFieldsType.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I consent to the use and disclosure of my health
            information for treatment purposes."
                    />

                    <CustomFormField
                        fieldType={FormFieldsType.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I acknowledge that I have reviewed and agree to the
            privacy policy"
                    />
                </section>


                <SubmitButton isLoading={isLoading}> Get Started </SubmitButton>
            </form>
        </Form>
    )
}
