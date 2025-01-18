import React from "react";
import InputField from "../components/InputField"; // استيراد مكون InputField

const Form = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        {errors.address && <span>{errors.address}</span>}
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </label>
    </div>
  );
};

export default Form;
