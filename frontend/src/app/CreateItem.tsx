"use client";
import React, { useState } from "react";
import Modal from "@/app/components/ui/modal/Modal";
import "./createItem.css";
import Input from "@/app/components/ui/input/Input";
import { Controller, useForm } from "react-hook-form";
import { useErrorMessage } from "@/hooks/useErrorMessage";
import {
  ErrorObject,
  ErrorObjectArr,
  getFieldsErrors,
} from "@/helpers/getFieldsErrors";
import ErrorTextWrapper from "@/app/components/ui/ErrorTextWrapper/ErrorTextWrapper";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { ToastMsg } from "@/app/components/ui/toast/ToastMsg";
import useAuthClient from "@/hooks/useAuthClient";
import { createItem } from "@/api/item";
import { ButtonReactAria } from "@/app/components/ui/ButtonReactAria";
import { Button } from "react-aria-components";

interface ICreateItemForm {
  name: string;
}

const CreateItem = () => {
  const { isAuthorized } = useAuthClient();
  const [state, setState] = useState({
    modal: false,
    errors: {} as { [p: string]: string | boolean },
  });

  const toggleModal = (state?: boolean) => {
    setState((p) => ({ ...p, modal: state || !p.modal }));
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateItemForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { ErrorMessages } = useErrorMessage();

  const handleSubmitForm = async (data: ICreateItemForm) => {
    try {
      setState((s) => ({ ...s, errors: {} }));
      await createItem(data);
      setState((s) => ({ ...s, modal: false }));
      toast.success(
        React.createElement(ToastMsg, {
          message: "Айтем успешно создан",
        }),
        { icon: false },
      );
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

  if (!isAuthorized) {
    return (
      <section>
        <span>Сначала авторизуйтесь</span>
      </section>
    );
  }

  return (
    <section>
      <Modal closeModal={() => toggleModal(false)} open={state.modal}>
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <fieldset>
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
                  label="Name"
                  type="text"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <div>
              {state.errors["name"] ? (
                <ErrorTextWrapper>{state.errors["name"]}</ErrorTextWrapper>
              ) : (
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <ErrorTextWrapper>{message}</ErrorTextWrapper>
                  )}
                />
              )}
            </div>
          </fieldset>
          <button type="submit" className="button button--bordered">
            Создать
          </button>
        </form>
      </Modal>
      <div className="create-item create-item--margin">
        <button
          onClick={() => toggleModal()}
          type="button"
          className="button button--bordered"
        >
          Создать айтем
        </button>
      </div>
      <ButtonReactAria onPress={() => alert(123)}>
        ButtonReactAria
      </ButtonReactAria>
      <Button onPress={() => alert("Button react-aria-components")}>
        Button react-aria-components
      </Button>
    </section>
  );
};

export default CreateItem;
