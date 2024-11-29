import React from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Import Zod for validation
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/features/AuthSlice"; // Import the loginRequest action
import InputField from "./commonFields/InputField"; // Assuming this is your custom InputField component

// Define the Zod validation schema
const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const MyForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema), // Apply Zod validation schema
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Dispatch the login request action to initiate the login process
    dispatch(loginRequest({ email: data.email, password: data.password }));
  };

  return (
    <Wrapper>
      <ImageSection />
      <FormSection>
        <FormProvider {...methods}>
          {/* Wrap form with FormProvider */}
          <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
            <Heading>Login</Heading>
            <InputField
              name="email"
              placeholder="Enter your email"
              label="Email"
              error={methods.formState.errors?.email} // Pass error from form state
            />
            <InputField
              name="password"
              placeholder="Enter your Password"
              label="Password"
              type="password"
              error={methods.formState.errors?.password} // Pass error from form state
            />
            {/* Disable the submit button if the form is invalid */}
            <StyledButton type="submit">Submit</StyledButton>
            <LinksContainer>
              <Link href="/forgot-password">Forgot Password?</Link>
              <Link href="/register">Register</Link>
            </LinksContainer>
          </FormWrapper>
        </FormProvider>
      </FormSection>
    </Wrapper>
  );
};

export default MyForm;

// Styled Components

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url("https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg"); /* Add your image URL here */
  background-size: cover;
  background-position: center;
  height: 100%;
`;

const FormSection = styled.section`
  flex: 1;
  max-width: 30rem; /* 400px */
  padding: 2rem;
  background-color: white;
  border-radius: 0 1rem 1rem 0; /* 10px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem; /* 24px */
  font-size: 1.8rem; /* 28px */
  font-weight: bold;
`;

const StyledButton = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem; /* 8px */
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem; /* 16px */
  width: 100%;
`;

const Link = styled.a`
  font-size: 0.9rem; /* 14px */
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
