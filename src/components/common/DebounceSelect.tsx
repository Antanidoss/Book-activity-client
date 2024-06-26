import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Form, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { Rule } from 'antd/lib/form';

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

    return debounce(loadOptions, props.debounceTimeout);
  }, []);

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
