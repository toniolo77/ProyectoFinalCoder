export const EMPTY_VALUE = {};

export const getErrorMsg = (err): string => {
  return err.errors.length > 0
    ? `El parametro ${err.errors[0].param} ${err.errors[0].msg}`
    : "";
};
