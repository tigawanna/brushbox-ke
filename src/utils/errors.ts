type ErrorPayload = {
  message?: string;
  data?: {
    data?: Record<string, { message?: string }>;
    message?: string;
  };
};

export const concatErrors = (err_res: unknown) => {
  if (typeof err_res !== "object" || err_res === null) {
    return err_res;
  }
  const root = err_res as ErrorPayload & { message?: string };
  const errs = root.data?.data;
  if (errs && Object.keys(errs).length > 0) {
    let err_str = "";
    Object.keys(errs).forEach((key) => {
      err_str += " - " + key + ":" + (errs[key]?.message ?? "");
    });
    return err_str;
  }
  if (root.data?.message) {
    return root.data.message;
  }
  if (root.message) {
    return root.message;
  }

  return err_res;
};
