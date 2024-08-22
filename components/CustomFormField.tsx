"use client"
import React from 'react'
import {  FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldsType } from './forms/PatientForm'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from "libphonenumber-js/core";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'

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
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />

                </FormControl>
            )
        case FormFieldsType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={(date: Date | null, event?: React.SyntheticEvent<any> | undefined) => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldsType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldsType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldsType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null;
        case FormFieldsType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
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