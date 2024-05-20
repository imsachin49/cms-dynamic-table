import React, { useEffect, useState } from 'react';
import { handleDeleteTable, handleFetchAllTables } from '../services/Api';
import TableView from '../components/TableView';
import InsertData from '../components/InsertData';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AllEntity = () => {
  const [tablesData, setTablesData] = useState([]);
  const [viewedTable, setViewedTable] = useState(null);
  const [insert, setInsert] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await handleFetchAllTables();
        setTablesData(response.allTablesQueryResponse.rows);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleViewData = async (tableName) => {
    setViewedTable(tableName);
  };

  const handleViewClose = () => {
    setViewedTable(null);
  };

  const handleInsertData = (tableName) => {
    setInsert(tableName);
  };

  const handleInsertClose = () => {
    setInsert(null);
  };

  const handleDelete = async (tableName) => {
    try {
      const response = await handleDeleteTable(tableName);
      if (response.error) {
        toast.error(response.message, { autoClose: 2000 });
      }
      else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting table', error);
    }
  };

  if (tablesData.length === 0) return (
    <div className="container mx-auto px-4 py-8 h-96">
      <h2 className="text-2xl font-bold mb-4 text-center">All Tables</h2>
      <div className="flex justify-center items-center flex-col h-full gap-5">
        <p className='text-md text-gray-500 m-0 p-0'>No Entity found at the moment</p>
        <Link to="/createEntity" className="border p-[5px] px-4 rounded-[5px] bg-gray-900 text-gray-100 mx-6 flex items-center">
          <span>
            Create Entity
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">All Tables</h2>
      <div className="overflow-x-auto w-full border">
        <table className="w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Table Name
              </th>
              <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tablesData.map((table, index) => (
              <tr key={index}>
                <td className="px-6 py-2 text-center whitespace-nowrap">
                  <span className="text-md font-semibold text-gray-600 capitalize">{table.table_name}</span>
                </td>
                <td className="px-6 py-2 flex gap-3 justify-center whitespace-nowrap">
                  <button onClick={() => handleViewData(table.table_name)} className="text-green-600 font-semibold underline rounded-md px-2 py-1 hover:text-gray-900">View Table</button>
                  <button onClick={() => handleInsertData(table.table_name)} className="text-indigo-600 font-semibold underline rounded-md px-2 py-1 hover:text-gray-900">Insert Data</button>
                  <button onClick={() => handleDelete(table.table_name)} className="text-red-600 underline font-semibold rounded-md px-2 py-1 hover:text-gray-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewedTable && (
        <TableView
          isOpen={true}
          isClose={handleViewClose}
          tableName={viewedTable}
        />
      )}
      {insert && (
        <InsertData
          isOpen={true}
          isClose={handleInsertClose}
          tableName={insert}
        />
      )}
    </div>
  );
};

export default AllEntity;
