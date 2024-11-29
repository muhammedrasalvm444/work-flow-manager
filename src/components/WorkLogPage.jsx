import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkLog } from "../redux/features/WorkLogSlice";
import WorkLogModal from "./modals/AddWorkingModal";
import styled from "styled-components";

// Styled Components
const ButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ThStyled = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f4f4f4;
`;

const TdStyled = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TrStyled = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const WorkLogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workLogs = useSelector((state) => state.workLogs);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteWorkLog(id));
  };

  return (
    <div>
      <ButtonStyled onClick={() => setIsModalOpen(true)}>
        Add Work Log
      </ButtonStyled>

      <TableStyled>
        <thead>
          <tr>
            <ThStyled>Task</ThStyled>
            <ThStyled>Actions</ThStyled>
          </tr>
        </thead>
        <tbody>
          {workLogs.map((log) => (
            <TrStyled key={log.id}>
              <TdStyled>{log.task}</TdStyled>
              <TdStyled>
                <ButtonStyled
                  onClick={() => handleDelete(log.id)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Delete
                </ButtonStyled>
              </TdStyled>
            </TrStyled>
          ))}
        </tbody>
      </TableStyled>

      <WorkLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WorkLogPage;
