import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  onChange,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <FieldWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputWrapper>
        <StyledInput
          id={name}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          onChange={(e) => onChange && onChange(e)}
        />
        {type === "password" && (
          <PasswordToggle onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default InputField;

// Styled Components
const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  padding-right: 3rem; /* To make space for the eye icon */
  margin-bottom: 0.3rem;
  border: 1px solid ${({ theme }) => theme.borderColor || "#ccc"};
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #333;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primaryColor || "#007bff"};
  }
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #007bff;
  font-size: 1.25rem; /* Increase size of the eye icon */
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
