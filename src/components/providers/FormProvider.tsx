"use client";

import React, { createContext, useContext, useState } from "react";

type FormData = Record<string, string | number | boolean | string[] | null>;

type FormContextType = {
  formData: FormData;
  updateFormData: (field: string, value: string | number | boolean | string[] | null) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (field: string, value: string | number | boolean | string[] | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const value = React.useMemo(() => ({ formData, updateFormData }), [formData]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
