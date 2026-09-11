"use client";

import { useEffect, useRef, useState } from "react";

// Build lại hành vi của plugin nice-select (assets/js/vendor/nice-select.js, khởi tạo ở
// main.js dòng ~182: $("select").niceSelect()) bằng React state — không dùng thư viện ngoài.
// CSS gốc: assets/css/nice-select.css (đã copy vào styles/nice-select.css) quyết định việc
// ẩn/hiện .list qua class "open" (opacity/transform), nên chỉ cần đúng class là ra đúng hiệu ứng.
type NiceSelectOption = {
  value: string;
  label: string;
};

type NiceSelectProps = {
  options: NiceSelectOption[];
  defaultValue?: string;
  className?: string;
};

export default function NiceSelect({ options, defaultValue, className }: NiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  return (
    <div
      ref={wrapperRef}
      className={`nice-select${isOpen ? " open" : ""}${className ? ` ${className}` : ""}`}
      tabIndex={0}
      onClick={() => setIsOpen((open) => !open)}
    >
      <span className="current">{selectedOption?.label}</span>
      <ul className="list">
        {options.map((option) => (
          <li
            key={option.value}
            data-value={option.value}
            className={`option${option.value === selectedValue ? " selected focus" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedValue(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
