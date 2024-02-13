import { render } from '@testing-library/react';

import Errors from '../components/Errors';

test("Error component should not render if no props passed", () => {
    const { container } = render(<Errors></Errors>);

    expect(container.querySelector(".alert")).not.toBeInTheDocument();
});

test("Error component should render if props passed", () => {
    const errors = [{msg: "Error 1"}];
    const { container, getByText } = render(<Errors errors={ errors }></Errors>);

    expect(container.querySelector(".alert")).toBeInTheDocument();
    expect(container.querySelectorAll(".alert").length).toBe(1);
    expect(getByText("Error 1")).toBeInTheDocument();
});

test("Error component should render multiple errorsd", () => {
    const errors = [{ msg: "Error 1", }, {msg: "Error 2"}];
    const { container, getByText } = render(<Errors errors={ errors }></Errors>);

    expect(container.querySelector(".alert")).toBeInTheDocument();
    expect(container.querySelectorAll(".alert").length).toBe(2);

    expect(getByText("Error 1")).toBeInTheDocument();
    expect(getByText("Error 2")).toBeInTheDocument();
});