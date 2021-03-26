import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../../routes';
import SelectView from './SelectView';

export type Rat = {
  width: number;
  height: number;
  nickname?: string;
};

const setDefaultNickName = (rat: Rat) =>
  rat.nickname ? rat : { ...rat, nickname: 'Uncool Rat with no Nickname' };

enum FecthProcessState {
  Idle = 'idle',
  Success = 'success',
  Failed = 'failed',
  Request = 'request'
}

export default function Select() {
  const [data, setData] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [fetchingData, setFetchingData] = useState<Rat | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [fetchProcessState, setFetchProcessState] = useState<FecthProcessState>(
    FecthProcessState.Idle
  );

  const handleChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  useEffect(() => {
    setNetworkError(null);
    setFetchProcessState(FecthProcessState.Request)
    axios
      .get(routes.getRats())
      .then(({ data }) => setData(data))
      .then(() => setFetchProcessState(FecthProcessState.Success))
      .catch((err) => {
        setNetworkError(err.message);
        setFetchProcessState(FecthProcessState.Failed)
      });
  }, [setData, setNetworkError, setFetchProcessState]);

  useEffect(() => {
    setNetworkError(null);
    if (selectedValue === '') {
      setFetchingData(null);
      return;
    }
    setFetchProcessState(FecthProcessState.Request);
    axios
      .get(routes.getRat(selectedValue))
      .then(({ data }) => {
        const currentData = setDefaultNickName(data);
        setFetchingData(currentData);
        setFetchProcessState(FecthProcessState.Success);
      })
      .catch((err) => {
        setNetworkError(err.message);
        setFetchingData(null);
        setFetchProcessState(FecthProcessState.Failed);
      });
  }, [selectedValue, setNetworkError, setFetchingData, setFetchProcessState]);

  return (
    <SelectView
      data={data}
      onChange={handleChange}
      selectedData={fetchingData}
      error={networkError}
      disabled={fetchProcessState === FecthProcessState.Request}
    />
  );
}
