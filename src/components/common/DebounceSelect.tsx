import React, { useMemo, useRef, useState } from 'react';
import { Form, Select, Spin } from 'antd';
import type { Rule } from 'antd/es/form';
import type { DefaultOptionType } from 'antd/es/select';

export type PropsType<T> = {
  fetchOptions: (param: string) => Promise<Array<T>>;
  debounceTimeout: number;
  transformToOptions: (items: Array<T>) => Array<DefaultOptionType>;
  fieldName: string;
  fieldLabel?: string;
  rules?: Rule[];
  placeholder?: string;
};

export const DebounceSelect: React.FC<PropsType<any>> = (props) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState(Array<DefaultOptionType>);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      props.fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        const optionList = props.transformToOptions(newOptions);
        setOptions(optionList);
        setFetching(false);
      });
    };

    return (value: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => loadOptions(value), props.debounceTimeout);
    };
  }, [props]);

  return (
    <Form.Item name={props.fieldName} rules={props.rules} label={props.fieldLabel}>
      <Select
        placeholder={props.placeholder}
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        options={options}
        mode="multiple"
      />
    </Form.Item>
  );
};
