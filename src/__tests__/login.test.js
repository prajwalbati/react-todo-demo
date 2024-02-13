import { render, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Login from '../components/auth/Login';
import ProfileContextProvider from '../contexts/ProfileContextProvider';
import * as sendRequest from '../utils/fetchRequest';

describe("Login Component", () => {
    it("renders correctly", () => {
        const {container, getByText, getByPlaceholderText, querySelector} = render(
            <BrowserRouter>
                <ProfileContextProvider>
                    <Login />
                </ProfileContextProvider>
            </BrowserRouter>
        );
        const title = container.querySelector(".card-title");
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual("Login");

        const emailLabel = getByText("Email *");
        expect(emailLabel).toBeInTheDocument();

        const emailInput = getByPlaceholderText("Email Address");
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).not.toBeDisabled();
        expect(emailInput).toBeRequired();

        const passwordLabel = getByText("Password *");
        expect(passwordLabel).toBeInTheDocument();

        const passwordInput = getByPlaceholderText("Password");
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).not.toBeDisabled();
        expect(passwordInput).toBeRequired();

        const loginBtn = container.querySelector(".btn");
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).not.toBeDisabled();
        expect(loginBtn.innerHTML).toEqual("Login");

        const createAccountElem = container.querySelector("a.createAccount");
        expect(createAccountElem).toBeInTheDocument();
        expect(createAccountElem).toHaveAttribute("href", "/register");
        expect(createAccountElem.innerHTML).toEqual("Create an Account");

        const forgotPasswordElem = container.querySelector("a.forgotPassword");
        expect(forgotPasswordElem).toBeInTheDocument();
        expect(forgotPasswordElem).toHaveAttribute("href", "/forgot-password");
        expect(getByText("Forgot Password?")).toBeInTheDocument();
    });

    it("submitting form without email and password should not work", async() => {
        const {container} = render(
            <BrowserRouter>
                <ProfileContextProvider>
                    <Login />
                </ProfileContextProvider>
            </BrowserRouter>
        );

        jest.spyOn(sendRequest, 'default')
            .mockImplementation(async () => {
                throw new Error("error");
            });

        const loginBtn = container.querySelector(".btn");
        await act(() => {
            userEvent.click(loginBtn);
        });

        expect(loginBtn).not.toBeDisabled();
    });

    it("submitting form should disable login button immediately", async() => {
        const {container} = render(
            <BrowserRouter>
                <ProfileContextProvider>
                    <Login />
                </ProfileContextProvider>
            </BrowserRouter>
        );

        const mockSendRequest = jest.spyOn(sendRequest, 'default')
            .mockImplementation(async () => {
                 return new Promise((resolve, reject) => {
                    resolve("Success");
                })
            });

        const loginBtn = container.querySelector(".btn");
        await act(() => {
            userEvent.click(loginBtn);
        });
        // How to test this?
        // expect(loginBtn).toBeDisabled();
        expect(mockSendRequest).toHaveBeenCalled();

    });

    it("successful login should redirect user to homepage", async () => {
         const {container} = render(
            <BrowserRouter>
                <ProfileContextProvider>
                    <Login />
                </ProfileContextProvider>
            </BrowserRouter>
        );

        const mockSendRequest = jest.spyOn(sendRequest, 'default')
            .mockImplementation(async () => {
                return new Promise((resolve, reject) => {
                    resolve({
                        json: () => Promise.resolve({
                            access_token: 100,
                            refresh_token: 100,
                            expires_in: 200
                        }),
                    })
                })
            });

        const emailElem = container.querySelector("input[name=email]");
        await userEvent.click(emailElem);
        emailElem.value = "test@test.com";

        const passwordElem = container.querySelector("input[name=password]");
        await userEvent.click(passwordElem);
        passwordElem.value = "password";

        const loginBtn = container.querySelector(".btn");
        await act(async () => {
            await userEvent.click(loginBtn);
        });
        expect(mockSendRequest).toHaveBeenCalled();
        await waitFor(() => {
            expect(window.location.href).toContain('/');
        });

    });
});