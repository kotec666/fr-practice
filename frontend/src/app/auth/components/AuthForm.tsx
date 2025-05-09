"use client";
import React, { useState } from "react";
import Input from "@/app/components/ui/input/Input";
import "./../auth.css";
import { Controller, useForm } from "react-hook-form";
import { useErrorMessage } from "@/hooks/useErrorMessage";
import {
  ErrorObject,
  ErrorObjectArr,
  getFieldsErrors,
} from "@/helpers/getFieldsErrors";
import { ErrorMessage } from "@hookform/error-message";
import ErrorTextWrapper from "@/app/components/ui/ErrorTextWrapper/ErrorTextWrapper";
import { useRouter } from "next/navigation";
import { signIn } from "@/api/user";
import { checkIfFormErrorNotExist } from "@/helpers/checkIfFormErrorNotExist";

interface IAuthForm {
  email: string;
  password: string;
}

const RegForm = () => {
  const router = useRouter();
  const [state, setState] = useState({
    errors: {} as { [p: string]: string | boolean },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { ErrorMessages } = useErrorMessage();

  const handleSubmitForm = async (data: IAuthForm) => {
    try {
      setState((s) => ({ ...s, errors: {} }));
      await signIn(data);
      router.push("/");
    } catch (e) {
      if (e instanceof Error && "response" in e) {
        const errors = await (
          e as {
            response: { json: () => Promise<ErrorObject | ErrorObjectArr> };
          }
        ).response.json();
        const formattedErrors = getFieldsErrors(errors);
        setState((s) => ({ ...s, errors: formattedErrors }));
      } else {
        console.error("Unexpected error occurred:", e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="form">
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: ErrorMessages.required,
          },
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: ErrorMessages.email,
          },
          minLength: {
            value: 1,
            message: ErrorMessages.optionalMin(1),
          },
          maxLength: {
            value: 60,
            message: ErrorMessages.optionalMax(60),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="email"
            value={value}
            onBlur={onBlur}
            aria-invalid={
              !checkIfFormErrorNotExist(errors, state.errors, "email")
            }
            aria-errormessage="err-email"
            onChange={(value) => {
              if (!value.target.value.includes(" ")) {
                onChange(value);
              }
            }}
          />
        )}
      />
      <div>
        {state.errors["email"] ? (
          <ErrorTextWrapper id="err-email">
            {state.errors["email"]}
          </ErrorTextWrapper>
        ) : (
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <ErrorTextWrapper id="err-email">{message}</ErrorTextWrapper>
            )}
          />
        )}
      </div>

      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: ErrorMessages.required,
          },
          minLength: {
            value: 5,
            message: ErrorMessages.optionalMin(1),
          },
          maxLength: {
            value: 60,
            message: ErrorMessages.optionalMax(60),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="password"
            type="password"
            aria-invalid={
              !checkIfFormErrorNotExist(errors, state.errors, "password")
            }
            aria-errormessage="err-password"
            value={value}
            onBlur={onBlur}
            onChange={(value) => {
              if (!value.target.value.includes(" ")) {
                onChange(value);
              }
            }}
          />
        )}
      />
      <div>
        {state.errors["password"] ? (
          <ErrorTextWrapper id="err-password">
            {state.errors["password"]}
          </ErrorTextWrapper>
        ) : (
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <ErrorTextWrapper id="err-password">{message}</ErrorTextWrapper>
            )}
          />
        )}
      </div>

      <button type="submit" className="button button--bordered">
        Авторизоваться
      </button>
    </form>
  );
};

export default RegForm;
