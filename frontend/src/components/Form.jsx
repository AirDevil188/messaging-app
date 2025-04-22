import { useFetcher } from "react-router-dom";

const Form = ({ method, onSubmit, children }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method={method} onSubmit={onSubmit}>
      {children}
    </fetcher.Form>
  );
};

export default Form;
