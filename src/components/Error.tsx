type ErrorComponentProps = {
  errorValue: unknown;
};

export default function ErrorComponent({ errorValue }: ErrorComponentProps) {
  let message = "Something went wrong. Please try again later.";
  if (errorValue instanceof Error) {
    message = errorValue.message;
  } else if (typeof errorValue === "string") {
    message = errorValue;
  }

  return <p className="error">{message}</p>;
}
