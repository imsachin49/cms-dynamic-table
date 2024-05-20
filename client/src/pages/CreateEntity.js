import React, { useState } from 'react';
import { handleCreateEntity } from '../services/Api';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CreateEntity = () => {
  const [entityName, setEntityName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [errors, setErrors] = useState({ entityName: '', columns: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sqlAttributeTypes = [
    "CHAR",
    "VARCHAR(255)",
    "TINYTEXT",
    "TEXT(255)",
    "MEDIUMTEXT",
    "LONGTEXT",
    "TINYINT",
    "BOOL",
    "SMALLINT",
    "MEDIUMINT",
    "INT",
    "BIGINT",
    "FLOAT",
    "DATE",
    "TIME",
    "TIMESTAMP",
    "BINARY",
    "VARBINARY",
    "BLOB",
  ];

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z][A-Za-z0-9]*[A-Za-z0-9]$/;
    if (!nameRegex.test(name)) {
      return 'Name must start with a letter, not end with an underscore, and contain only alphanumeric characters without spaces.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    const entityNameError = validateName(entityName);
    let columnErrors = columns.map((column) => validateName(column.name));

    if (entityNameError) {
      formIsValid = false;
      setErrors((prevErrors) => ({ ...prevErrors, entityName: entityNameError }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, entityName: '' }));
    }

    columnErrors.forEach((error, index) => {
      if (error) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      setErrors((prevErrors) => ({ ...prevErrors, columns: columnErrors }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, columns: [] }));
    }

    const entityData = {
      entityName,
      columns,
    };
    setLoading(true);
    const response = await handleCreateEntity(entityData);
    if (response.error) {
      toast.error(response.error + '. ' + response.message, { autoClose: 2000 });
    }
    else {
      toast.success(response.message, { autoClose: 2000 });
      navigate('/');
    }
    setLoading(false);
    setEntityName('');
    setColumns([{ name: '', type: '' }]);
  };

  const addColumnField = () => {
    setColumns([...columns, { name: '', type: '' }]);
    setErrors((prevErrors) => ({ ...prevErrors, columns: [...prevErrors.columns, ''] }));
  };

  const deleteColumnField = (index) => {
    if (columns.length > 1) {
      const newColumns = [...columns];
      newColumns.splice(index, 1);
      setColumns(newColumns);

      const newErrors = [...errors.columns];
      newErrors.splice(index, 1);
      setErrors((prevErrors) => ({ ...prevErrors, columns: newErrors }));
    }
  };

  const handleColumnNameChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].name = value;
    setColumns(newColumns);

    const columnError = validateName(value);
    const newErrors = [...errors.columns];
    newErrors[index] = columnError;
    setErrors((prevErrors) => ({ ...prevErrors, columns: newErrors }));
  };

  const handleAttributeTypeChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].type = value;
    setColumns(newColumns);
  };

  const Loader = () => {
    return (<div role="status">
      <svg aria-hidden="true" class="w-19 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>)
  }

  return (
    <div className="container px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Entity</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="entityName" className="block text-gray-700">Entity Name:</label>
          <input
            type="text"
            id="entityName"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="border border-gray-800 rounded-md px-4 py-2 w-[40%]"
            required
          />
          {errors.entityName && <p className="text-red-500">{errors.entityName}</p>}
        </div>
        {columns.map((column, index) => (
          <div key={index} className='flex gap-[5%]'>
            <div className="mb-4 w-[40%]">
              <label htmlFor={`columnName${index}`} className="block text-gray-700">Column Name:</label>
              <input
                type="text"
                id={`columnName${index}`}
                value={column.name}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
                className="border border-gray-800 rounded-md px-4 py-2 w-full"
                required
              />
              {errors.columns[index] && <p className="text-red-500">{errors.columns[index]}</p>}
            </div>
            <div className="mb-4 w-[40%]">
              <label htmlFor={`attributeType${index}`} className="block text-gray-700">Attribute Type:</label>
              <select
                id={`attributeType${index}`}
                value={column.type}
                onChange={(e) => handleAttributeTypeChange(index, e.target.value)}
                className="border border-gray-800 rounded-md px-4 py-2 w-full"
                required
              >
                <option value="" disabled>Select Attribute Type</option>
                {sqlAttributeTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className='mt-6 w-[5%]'>
              {columns.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteColumnField(index)}
                  className="bg-red-500 text-white px-2 py-1 h-10 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" disabled={loading} onClick={addColumnField} className={`bg-[brown] text-white px-4 py-2 rounded-md hover:bg-[#ce4c4c] mb-4 ${loading ? "bg-[#ce4c4c]" : ""}`}>Add Column</button>
        <button type="submit" disabled={loading} className={`bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 ml-2 mb-4 ${loading ? "bg-teal-600" : ""}`}>
          {loading ?
            <span className='inline-flex items-center gap-1'>
              Loading <Loader />
            </span> :
            <span className='inline-flex items-center gap-1'>
              Create Entity
            </span>
          }
        </button>
      </form>
      <div>
      </div>
    </div>
  );
};

export default CreateEntity;
