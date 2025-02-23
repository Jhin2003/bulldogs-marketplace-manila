import React, { useState } from "react";
import "./EditModal.scss";

const EditModal = ({ title, fields, data, onSave, onClose }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        <h2 className="edit-modal-title">{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="edit-modal-form-group">
            <label className="edit-modal-label">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="edit-modal-input"
            />
          </div>
        ))}
        <div className="edit-modal-actions">
          <button className="edit-modal-btn-save" onClick={handleSubmit}>
            Save
          </button>
          <button className="edit-modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
