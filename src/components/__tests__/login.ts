import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/vue";
import Login from '@/views/login-page.vue';

describe("Login test suite", () => {
  it("should render correctly", () => {
    render(Login);
  });

  it("should contain 'Login with:' on the page", () => {
    const { getByText } = render(Login);
    getByText('Login with:');
  });

  it("should throw invalid email error", async () => {
    const { getByText } = render(Login);
    getByText("Email:");

    // Get the input DOM node by querying the associated label.
    const emailInput = screen.getByLabelText(/Email:/i);

    // Updates the <input> value and triggers an `input` event.
    // fireEvent.input() would make the test fail.
    await fireEvent.update(emailInput, "Bob");
    // await fireEvent.update(emailInput, "");

    getByText("Value is not a valid email address");
  });

  it("should throw invalid password", async () => {
    const { getByText } = render(Login);
    getByText("Email:");

    // Get the input DOM node by querying the associated label.
    const passwordInput = screen.getByLabelText(/Password:/i);

    // Updates the <input> value and triggers an `input` event.
    // fireEvent.input() would make the test fail.
    await fireEvent.update(passwordInput, "Bob");
    // await fireEvent.update(emailInput, "");

    getByText("This field should be at least 8 characters long");
  });
});