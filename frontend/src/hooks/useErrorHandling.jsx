import { handleError } from "../services/errorHandlerService";

export const useErrorHandling = () => {
  const displayError = (error) => {
    handleError(error);
  };

  return {
    displayError,
  };
};
