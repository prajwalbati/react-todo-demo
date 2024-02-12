import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SingleTodo from "../components/todo/SingleTodo";
import * as sendRequest from '../utils/fetchRequest';

const mockTodoData = {
    _id: "wweee",
    title: "New todo",
    is_completed: false
};

const mockSendRequest = jest.spyOn(sendRequest, 'default')
    .mockImplementation(async () => {
        return {};
    });

test("Single Todo display successfully", () => {
    render(<SingleTodo todo={mockTodoData} />)
    expect(screen.getByText(/New todo/i)).toBeInTheDocument();
})

test("Todo with not completed should be unchecked", () => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: false
    };
    const { container } = render(<SingleTodo todo={mockTodoData} />)

    expect(container.getElementsByClassName("completed").length).toBe(0);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("Todo with completed should be checked", () => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: true
    };
    const { container } = render(<SingleTodo todo={mockTodoData} />)

    expect(container.getElementsByClassName("completed").length).toBe(1);

    expect(screen.getByRole("checkbox")).toBeChecked();
});

test("Checkbox should be checked on clicking unchecked checkbox", async() => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: false
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />)

    expect(screen.getByRole("checkbox")).not.toBeChecked();

    await act(async() => {
        await userEvent.click(container.getElementsByClassName('checkbox')[0]);
    });

    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).toBeChecked();
});

test("Checkbox should be unchecked on clicking checked checkbox", async() => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: true
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />)

    expect(screen.getByRole("checkbox")).toBeChecked();

    await act(async() => {
        await userEvent.click(container.getElementsByClassName('checkbox')[0]);
    });
    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
});


test("Update todo called", async () => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: false
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />)

    await act(async() => {
        await userEvent.click(container.getElementsByClassName('checkbox')[0]);
    });

    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).toHaveBeenCalled();
});

test("Todo should be removed once delete button is clicked", async() => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Removed Todo",
        is_completed: true
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />);

    const checkbox = container.getElementsByClassName("checkbox");
    expect(checkbox.length).toBe(1);

    await act(async () => {
        await userEvent.click(container.getElementsByClassName('remove')[0]);
    });
    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).toHaveBeenCalled();
    await waitFor(async () => {
        const button = container.getElementsByClassName('remove')[0];
        expect(button).toBeDisabled();
    });
});

test("uncheck checkbox if error occured on checking todo", async() => {
    jest.spyOn(sendRequest, 'default')
        .mockImplementation(async () => {
            throw new Error("error");
        });

    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: false
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />)

    expect(screen.getByRole("checkbox")).not.toBeChecked();

    await act(async() => {
        await userEvent.click(container.getElementsByClassName('checkbox')[0]);
    });

    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("check checkbox if error occured on unchecking todo", async() => {
    jest.spyOn(sendRequest, 'default')
        .mockImplementation(async () => {
            throw new Error("error");
        });

    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Completed Todo",
        is_completed: true
    };
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />)

    expect(screen.getByRole("checkbox")).toBeChecked();

    await act(async() => {
        await userEvent.click(container.getElementsByClassName('checkbox')[0]);
    });

    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).toBeChecked();
});

test("Delete button should be enabled if error occured after clicking delete", async() => {
    const mockTodoData = {
        _id: "E3ejdfjju56",
        title: "Removed Todo",
        is_completed: true
    };
    jest.spyOn(sendRequest, 'default')
        .mockImplementation(async () => {
            throw new Error("error");
        });
    const dispatchFn = jest.fn();
    const { container } = render(<SingleTodo todo={mockTodoData} dispatch={dispatchFn} />);

    const checkbox = container.getElementsByClassName("checkbox");
    expect(checkbox.length).toBe(1);

    await act(async () => {
        await userEvent.click(container.getElementsByClassName('remove')[0]);
    });
    expect(mockSendRequest).toHaveBeenCalled();
    expect(dispatchFn).not.toHaveBeenCalled();
    await waitFor(async () => {
        const button = container.getElementsByClassName('remove')[0];
        expect(button).toBeEnabled();

        const checkbox = container.getElementsByClassName("checkbox");
        expect(checkbox.length).toBe(1);
    });
});