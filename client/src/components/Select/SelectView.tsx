import React from 'react';
import styled from 'styled-components';
import { upperFirst } from 'lodash';

type Rat = {
  width: number;
  height: number;
  nickname?: string;
};

type Props = {
  data: string[];
  onChange: (value: string) => void;
  selectedData: Rat | null;
  error: string | null;
  disabled?: boolean;
};

const Select = styled.select`
  width: 100%;
  padding: 8px;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;

  background-color: #fff;

  appearance: none;

  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right .75rem center;
  background-size: 16px 12px;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  }
`;

const WrapperSelect = styled.div`
  position: relative;
  width: 100%;
`;

const SelectView: React.FC<Props> = ({
  data,
  onChange,
  selectedData,
  error,
  disabled = false,
}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-8 col-md-4 mb-3">
        <WrapperSelect>
          <Select
            onChange={(e) => onChange(e.target.value)}
            className="form-select form-select-lg"
            aria-label="Select the rat"
            id="select"
            disabled={disabled}
          >
            <option selected value="">
              No Rat
            </option>
            {data.map((value, i) => (
              <option value={value} key={i}>
                {upperFirst(value)}
              </option>
            ))}
          </Select>
        </WrapperSelect>
        {error && (
          <div className="mt-3 alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className="col-8 col-md-4">
        <ul className="list-group">
          {selectedData &&
            Object.entries(selectedData).map(([key, value], index) => (
              <li className="list-group-item" key={index}>
                <strong>{upperFirst(key)}: </strong>
                {value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectView;
