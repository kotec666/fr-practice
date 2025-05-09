"use client";
import Image from "next/image";
import "./error-text-wrapper.css";

interface ErrorTextWrapperProps {
  id?: string;
  children?: React.ReactNode;
}

const ErrorTextWrapper = ({ children, id }: ErrorTextWrapperProps) => {
  return (
    <div className="error-container" aria-live="polite">
      <div className="image-container">
        <Image
          height={20}
          src="/svg/error.svg"
          width={20}
          alt="Ошибка валидации"
        />
      </div>
      <span className="error-message" id={id}>
        {children}
      </span>
    </div>
  );
};

export default ErrorTextWrapper;
