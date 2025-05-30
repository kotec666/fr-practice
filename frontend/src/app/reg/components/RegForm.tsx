"use client";
import React, { useState } from "react";
import Input from "@/app/components/ui/input/Input";
import "./../reg.css";
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
import { signIn, signUp } from "@/api/user";
import { checkIfFormErrorNotExist } from "@/helpers/checkIfFormErrorNotExist";

interface IRegForm {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
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
  } = useForm<IRegForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { ErrorMessages } = useErrorMessage();

  const handleSubmitForm = async (data: IRegForm) => {
    try {
      setState((s) => ({ ...s, errors: {} }));
      await signUp(data);
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
            aria-invalid={
              !checkIfFormErrorNotExist(errors, state.errors, "email")
            }
            aria-errormessage="err-email"
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
        name="name"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: ErrorMessages.required,
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
            label="name"
            type="text"
            aria-invalid={
              !checkIfFormErrorNotExist(errors, state.errors, "name")
            }
            aria-errormessage="err-name"
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
        {state.errors["name"] ? (
          <ErrorTextWrapper id="err-name">
            {state.errors["name"]}
          </ErrorTextWrapper>
        ) : (
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <ErrorTextWrapper id="err-name">{message}</ErrorTextWrapper>
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

      <Controller
        name="repeatPassword"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: ErrorMessages.required,
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
            label="repeat password"
            type="password"
            aria-invalid={
              !checkIfFormErrorNotExist(errors, state.errors, "repeatPassword")
            }
            aria-errormessage="err-repeatPassword"
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
        {state.errors["repeatPassword"] ? (
          <ErrorTextWrapper id="err-repeatPassword">
            {state.errors["repeatPassword"]}
          </ErrorTextWrapper>
        ) : (
          <ErrorMessage
            errors={errors}
            name="repeatPassword"
            render={({ message }) => (
              <ErrorTextWrapper id="err-repeatPassword">
                {message}
              </ErrorTextWrapper>
            )}
          />
        )}
      </div>
      <button type="submit" className="button button--bordered">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegForm;
