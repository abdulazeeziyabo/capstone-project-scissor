import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/vue";
import Login from '@/views/login-page.vue';

describe("Login test suite", ()=>{
  it("should render correctly", ()=>{
    render(Login)
  });
  it("should contain 'Login with' on the page ", ()=>{
    const {getByText} = render (Login);
    getByText("Login with:")
  })
})

   
   