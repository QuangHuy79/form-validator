import React from "react";

function FieldInput({ label, name, type = "text", formik }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="error">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default FieldInput;
