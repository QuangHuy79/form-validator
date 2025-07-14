import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FieldInput from "./FieldInput";
import ReviewModal from "./ReviewModal";
import "../styles.css";

function FormValidator() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewValues, setPreviewValues] = useState({});

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Bắt buộc").min(4, "Tối thiểu 4 ký tự"),
      email: Yup.string().required("Bắt buộc").email("Email không hợp lệ"),
      password: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Mật khẩu 7-19 ký tự, chứa chữ, số, ký tự đặc biệt"
        ),
      password2: Yup.string()
        .required("Bắt buộc")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: (values) => {
      setPreviewValues(values);
      setIsOpen(true);
    },
  });

  const handleConfirmSend = async () => {
    try {
      await axios.post("http://localhost:3001/users", previewValues);
      alert("Đăng ký thành công!");
      setIsOpen(false);
      formik.resetForm();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="container">
      <h2>Đăng ký</h2>
      <form onSubmit={formik.handleSubmit}>
        <FieldInput label="Tên người dùng" name="username" formik={formik} />
        <FieldInput label="Email" name="email" formik={formik} />
        <FieldInput
          label="Mật khẩu"
          name="password"
          type="password"
          formik={formik}
        />
        <FieldInput
          label="Xác nhận mật khẩu"
          name="password2"
          type="password"
          formik={formik}
        />

        {/* Nút hiển thị rõ ràng */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            🚀 Đăng nhập
          </button>
        </div>
      </form>

      {/* Modal xác nhận trước khi gửi */}
      <ReviewModal
        isOpen={isOpen}
        values={previewValues}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirmSend}
      />
    </div>
  );
}

export default FormValidator;
