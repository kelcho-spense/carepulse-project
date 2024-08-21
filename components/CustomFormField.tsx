"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldsType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldsType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, placeholder } = props;
    switch (fieldType) {
        case FormFieldsType.INPUT:
            return (
                <div className="flex rounded-md border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "iconAlt"}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            className='shad-input border-0'
                            type='text'
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                </div>
            )
        case FormFieldsType.PHONE_INPUT:
            return (

                <FormControl>
                    <PhoneInput
                        defaultCountry='KE'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as string | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />

                </FormControl>
            )
        case FormFieldsType.TEXTAREA:
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, placeholder, iconSrc, iconAlt, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {
                        fieldType !== FormFieldsType.CHECKBOX && label && (
                            <FormLabel> {label}</FormLabel>
                        )
                    }
                    <RenderField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField