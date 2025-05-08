"use client";
import React from "react";
import Container from "@/app/components/ui/container/Container";
import "./header.css";
import Link from "next/link";
import {
  ErrorObject,
  ErrorObjectArr,
  getFieldsErrors,
} from "@/helpers/getFieldsErrors";
import { useUserStore } from "@/store/user";
import { logoutUser } from "@/api/user";

interface IHeaderProps {
  isAuthorized?: boolean;
}

const Header = (props: IHeaderProps) => {
  const removeUser = useUserStore((state) => state.removeUser);

  const logout = async () => {
    try {
      removeUser();
      await logoutUser();
      return window.location.reload();
    } catch (e) {
      if (e instanceof Error && "response" in e) {
        const errors = await (
          e as {
            response: { json: () => Promise<ErrorObject | ErrorObjectArr> };
          }
        ).response.json();
        getFieldsErrors(errors);
      } else {
        console.error("Unexpected error occurred:", e);
      }
    }
  };

  return (
    <header className="header">
      <Container>
        <nav className="header__inner header--bordered">
          <div role="list" className="header__list">
            <div role="listitem" className="header__list-item">
              <Link href="/">home page</Link>
            </div>
            <div role="listitem" className="header__list-item">
              <Link className="header__list-item" href="/images">
                images page
              </Link>
            </div>
            <div
              role="listitem"
              className="header__list-item header__list-item--styled"
            >
              <Link href="/ssg">ssg items</Link>
            </div>
            <div
              role="listitem"
              className="header__list-item header__list-item--styled"
            >
              <Link href="/isr">isr items</Link>
            </div>
            {!props.isAuthorized && (
              <>
                <div
                  role="listitem"
                  className="header__list-item header__list-item--styled"
                >
                  <Link href="/auth">Авторизация</Link>
                </div>
                <div
                  role="listitem"
                  className="header__list-item header__list-item--styled"
                >
                  <Link href="/reg">Регистрация</Link>
                </div>
              </>
            )}
          </div>
          {props.isAuthorized && (
            <button
              onClick={logout}
              className="button button--bordered"
              style={{ margin: "0 20px" }}
            >
              Выход
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
