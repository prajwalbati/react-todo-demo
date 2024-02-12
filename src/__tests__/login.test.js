import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import ProfileContextProvider from '../contexts/ProfileContextProvider';

test("Login page contains card title as Login", () => {
    const {container} = render(
        <BrowserRouter>
            <ProfileContextProvider>
                <Login />
            </ProfileContextProvider>
        </BrowserRouter>);

    const headerElem = container.getElementsByClassName("card-title");

    expect(headerElem.length).toBe(1);

    const headerText = headerElem[0].innerHTML;
    expect(headerText).toEqual("Login");

    const emailLabel = screen.getByText("Email *");
    expect(emailLabel).toBeDefined();

    const passwordLabel = screen.getByText("Password *");
    expect(passwordLabel).toBeDefined();
})