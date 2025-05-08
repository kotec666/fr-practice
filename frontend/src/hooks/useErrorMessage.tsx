import { getNoun } from "@/helpers/getNoun";

export interface IErrorMessages {
  minLength: string;
  maxLength: string;
  required: string;
  email: string;
  notNumber: string;
  optionalMin: (count: number) => string;
  optionalMax: (count: number) => string;
  customMessage: (string: string) => string;
}

export const useErrorMessage = (
  minCount: number = 1,
  maxCount: number = 100,
) => {
  const symbolWord = {
    one: "symbol",
    two: "symbols",
    five: "symbols",
  };
  const getParameterNoun = (count: number) => {
    return getNoun(+count, symbolWord.one, symbolWord.two, symbolWord.five);
  };

  const ErrorMessages: IErrorMessages = {
    minLength: `Minimum length is ${getParameterNoun(minCount)}`,
    maxLength: `Maximum length is ${getParameterNoun(maxCount)}`,
    required: "Required field",
    email: "The field does not correspond to a valid format",
    notNumber: "The field can only contain letters",
    optionalMin: (count: number) => {
      return "Minimum length is " + getParameterNoun(count);
    },
    optionalMax: (count: number) => {
      return "Maximum length is " + getParameterNoun(count);
    },
    customMessage: (string: string) => {
      return `${string}`;
    },
  };
  return { ErrorMessages };
};
