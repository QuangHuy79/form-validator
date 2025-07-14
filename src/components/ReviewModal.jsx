import React from "react";
import "../styles.css";

function ReviewModal({ isOpen, values, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Xác nhận thông tin</h3>
        <ul>
          <li>👤 Username: {values.username}</li>
          <li>📧 Email: {values.email}</li>
          <li>🔒 Password: {values.password}</li>
        </ul>
        <button onClick={onConfirm}>✅ Đồng ý gửi</button>
        <button onClick={onCancel}>❌ Hủy</button>
      </div>
    </div>
  );
}

export default ReviewModal;
