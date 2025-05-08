"use client";
import Image from "next/image";
import "./error-text-wrapper.css";

interface ErrorTextWrapperProps {
  children?: React.ReactNode;
}

const ErrorTextWrapper = ({ children }: ErrorTextWrapperProps) => {
  return (
    <div className="error-container">
      <div className="image-container">
        <Image
          height={20}
          src="/svg/error.svg"
          width={20}
          alt="Ошибка валидации"
        />
      </div>
      <span className="error-message">{children}</span>
    </div>
  );
};

export default ErrorTextWrapper;
