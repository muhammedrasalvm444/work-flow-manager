import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addWorkLog } from "../../redux/features/WorkLogSlice";

const WorkLogModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleAdd = (data) => {
    dispatch(addWorkLog({ task: data.task, id: Date.now() }));
    onClose();
  };

  return (
    <ModalBackdrop isOpen={isOpen}>
      <ModalContainer>
        <ModalHeaderStyled>Add Work Log</ModalHeaderStyled>
        <ModalBodyStyled>
          <form onSubmit={handleSubmit(handleAdd)}>
            <div>
              <label>Task</label>
              <InputStyled
                type="text"
                placeholder="Enter task"
                {...register("task", { required: "Task is required" })}
              />
              {errors.task && (
                <FormErrorMessageStyled>
                  {errors.task.message}
                </FormErrorMessageStyled>
              )}
            </div>
            <ModalFooterStyled>
              <ButtonStyled variant="cancel" onClick={onClose}>
                Cancel
              </ButtonStyled>
              <ButtonStyled type="submit">Add</ButtonStyled>
            </ModalFooterStyled>
          </form>
        </ModalBodyStyled>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default WorkLogModal;
// Styled Components
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  width: 25rem;
  border-radius: 0.5rem;
  z-index: 1001;
`;

const ModalHeaderStyled = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`;

const ModalBodyStyled = styled.div`
  padding: 2rem 0;
`;

const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ButtonStyled = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "cancel" ? "#f0f0f0" : "#007bff"};
  color: ${(props) => (props.variant === "cancel" ? "#000" : "#fff")};
  border: none;

  &:hover {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#ddd" : "#0056b3"};
  }
`;

const InputStyled = styled.input`
  padding: 0.625rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
  margin-bottom: 1rem;

  &:focus {
    outline-color: #007bff;
  }
`;

const FormErrorMessageStyled = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.3125rem;
`;
