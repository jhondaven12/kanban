"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Styled from "./select.styled";
import useOutsideAlterter from "../lib/useOutsideAlerter";

interface SelectProps<T> {
  title?: string;
  options: T[];
  value: number | null;
  getLabel: (option: T) => string;
  getValue: (option: T) => number;
  onSelect: (selected: SelectOptionsProps) => void;
}

interface SelectOptionsProps {
  label: string;
  value: number;
}

export const Select = <T,>({
  title,
  options,
  value,
  getLabel,
  getValue,
  onSelect,
}: SelectProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<SelectOptionsProps[]>([]);

  useEffect(() => {
    const createArrObj = options.map((opt) => ({
      label: getLabel(opt),
      value: getValue(opt),
    }));
    setSelectOptions(createArrObj);
  }, [options]);

  useEffect(() => {
    const getSelectedOpt = selectOptions.find((item) => item.value === value);
    setInputValue(getSelectedOpt?.label ?? "");
  }, [value]);

  const FilterOptiopns = useMemo(() => {
    return selectOptions.filter(({ label }) =>
      label.toLowerCase().includes(inputValue?.toLowerCase() ?? ""),
    );
  }, [selectOptions, inputValue, getLabel]);

  useOutsideAlterter({
    ref: wrapperRef,
    onOutsideClick: () => setIsOpen(false),
  });

  const onSelectHandler = (selectedOpt: SelectOptionsProps): void => {
    setInputValue(selectedOpt.label);
    onSelect(selectedOpt);
    setIsOpen(false);
  };

  const onChangeHandler = (value: string): void => {
    setIsOpen(value !== "");
    setInputValue(value);
  };

  return (
    <Styled.SelectContainer>
      <Styled.SelectTitle>{title}</Styled.SelectTitle>
      <Styled.InputContainer ref={wrapperRef}>
        <input
          type="text"
          value={inputValue}
          placeholder="Select Status..."
          onChange={(event) => onChangeHandler(event.target.value)}
        />

        {isOpen && (
          <Styled.DropdownOptions>
            {FilterOptiopns.map((opt) => (
              <button key={opt.value} onClick={() => onSelectHandler(opt)}>
                {opt.label}
              </button>
            ))}
          </Styled.DropdownOptions>
        )}
      </Styled.InputContainer>
    </Styled.SelectContainer>
  );
};
