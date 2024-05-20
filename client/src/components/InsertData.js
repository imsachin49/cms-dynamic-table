import React, { useEffect, useState } from 'react';
import { handleInsertTableData, handlefetchTableDetails } from '../services/Api'; // Assume you have an API function to insert data
import { toast } from 'react-toastify';

const InsertData = ({
  isOpen,
  isClose,
  tableName,
}) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [entries, setEntries] = useState([{}]);

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const response = await handlefetchTableDetails(tableName);
        const columns = response.response.response1.rows.filter(column => column.column_name !== 'id');
        setTableColumns(columns);
      } catch (error) {
        console.error('Error fetching table details:', error);
      }
    };

    if (isOpen) {
      fetchTableDetails();
    }
  }, [isOpen, tableName]);

  const handleClose = () => {
    isClose();
  };

  const handleInputChange = (index, column, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [column]: value,
    };
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries([...entries, {}]);
  };

  const handleDeleteEntry = (index) => {
    if (entries.length > 1) {
      const updatedEntries = entries.filter((_, entryIndex) => entryIndex !== index);
      setEntries(updatedEntries);
    }
  };

  const handleSaveEntries = async () => {
    const data = {
      ...entries,
      tableName,
    }
    try {
      const response = await handleInsertTableData(data);
      if (response.error) {
        toast.error(response.message, { autoClose: 2000 });
      }
      else {
        isClose();
        toast.success(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error adding new entries:', error);
    }
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
                <tbody>
                  {entries.map((entry, entryIndex) => (
                    <tr key={entryIndex}>
                      {tableColumns.map((column, columnIndex) => (
                        <td key={columnIndex} className="px-6 py-4 text-center whitespace-nowrap">
                          <input
                            type="text"
                            value={entry[column.column_name] || ''}
                            onChange={(e) => handleInputChange(entryIndex, column.column_name, e.target.value)}
                            className="border-2 border-gray-400 p-1 text-center rounded"
                            placeholder={`Enter ${column.column_name}`}
                          />
                        </td>
                      ))}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {entries.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteEntry(entryIndex)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleAddEntry}
                className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600"
              >
                Add Entry
              </button>
              <button
                type="button"
                onClick={handleSaveEntries}
                className="bg-[brown] text-white px-2 py-1 rounded-md hover:bg-[#b94d4d]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InsertData;
