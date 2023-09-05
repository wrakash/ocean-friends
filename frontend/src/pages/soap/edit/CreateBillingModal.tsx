import React, { useState } from "react";

const CreateBillingModal = ({ onCreate, onChangeHandler }: any) => {
  const [formData, setFormData] = useState({
    code: "",
    desc: "",
    qty: 0,
    price: 0,
    type: "",
  });

  const handleChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    onCreate(formData);

    setFormData({
      code: "",
      desc: "",
      qty: 0,
      price: 0,
      type: "",
    });
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Create Billing Code</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Code
          </label>
          <input
            type="text"
            value={formData.code}
            placeholder="Enter ..."
            onChange={(e) => handleChange(e.target.value, "code")}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            placeholder="Enter ..."
            value={formData.desc}
            onChange={(e) => handleChange(e.target.value, "desc")}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            placeholder="Enter ..."
            value={formData.price}
            onChange={(e) => handleChange(e.target.value, "price")}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            type="text"
            value={formData.type}
            placeholder="Enter ..."
            onChange={(e) => handleChange(e.target.value, "type")}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            qty
          </label>
          <input
            type="text"
            value={formData.qty}
            placeholder="Enter ..."
            onChange={(e) => handleChange(e.target.value, "qty")}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="w-full flex justify-end space-x-4">
        <button
          onClick={() => onChangeHandler(false, "isCreatingBillingCode")}
          className="bg-gray-100 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBillingModal;
