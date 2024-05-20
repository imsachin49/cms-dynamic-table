import React, { useEffect, useState } from 'react';
import { handleDeleteTableData, handlefetchTableDetails, handleUpdateTableData } from '../services/Api'; // Assume you have an API function to update the row
import { toast } from 'react-toastify';

const TableView = ({
  isOpen,
  isClose,
  tableName,
}) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDetails, setTableDetails] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [rowValues, setRowValues] = useState({});

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const response = await handlefetchTableDetails(tableName);
        const columns = response.response.response1.rows.filter(column => column.column_name !== 'id');
        setTableColumns(columns);
        setTableDetails(response.response.response2.rows);
      } catch (error) {
        console.error('Error fetching table details:', error);
      }
    };

    if (isOpen) {
      fetchTableDetails();
    }
  }, [isOpen, tableName]);

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
    setRowValues(tableDetails[rowIndex]);
  };

  const handleChange = (e, column) => {
    setRowValues({
      ...rowValues,
      [column]: e.target.value,
      tableName,
    });
  };

  const handleSave = async (rowIndex) => {
    try {
      const response = await handleUpdateTableData(rowValues);
      if (response) {
        const updatedDetails = [...tableDetails];
        updatedDetails[rowIndex] = rowValues;
        setTableDetails(updatedDetails);
        setEditingRow(null);
        setRowValues({});
        toast.success(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (rowIndex) => {
    const id = tableDetails[rowIndex].id;
    const data = {
      id,
      tableName,
    }
    try {
      const response = await handleDeleteTableData(data);
      if (response) {
        // Remove the deleted row from table details
        const updatedDetails = tableDetails.filter((_, index) => index !== rowIndex);
        setTableDetails(updatedDetails);
        toast.success(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  const handleCancel = () => {
    setEditingRow(null);
    setRowValues({});
  };

  const handleClose = () => {
    isClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-0 lg:top-20 mx-auto p-5 border shadow-lg rounded-md bg-white w-full h-full lg:h-auto lg:w-[850px]">
            <button
              onClick={handleClose}
              className='rounded-full px-2 border-gray-800 border-2 text-lg'
            >X</button>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableColumns.map((column, index) => (
                      <th key={index} scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                        {column.column_name}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableDetails.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {tableColumns.map((column, columnIndex) => (
                        <td key={columnIndex} className="px-6 py-4 text-center whitespace-nowrap">
                          {editingRow === rowIndex ? (
                            <input
                              type="text"
                              value={rowValues[column.column_name] || ''}
                              onChange={(e) => handleChange(e, column.column_name)}
                              className="border p-1 text-center rounded"
                            />
                          ) : (
                            <span className="text-m font-medium text-gray-900">{row[column.column_name]}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 flex gap-2 justify-center text-center whitespace-nowrap">
                        {editingRow === rowIndex ? (
                          <>
                            <button
                              onClick={() => handleSave(rowIndex)}
                              className="bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-600 text-white rounded-md px-2 py-1 hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(rowIndex)}
                              className="bg-indigo-600 text-white rounded-md px-2 py-1 hover:bg-indigo-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(rowIndex)}
                              className="bg-red-600 text-white rounded-md px-2 py-1 hover:bg-red-700">
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableView;
