const BASE_URL="http://localhost:5001"

export const handleCreateEntity = async (entityData) =>{
    try {
        const url = `${BASE_URL}/entity/createtable`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entityData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error creating table:', error.message);
    }
};

export const handleFetchAllTables = async () =>{
    try {
        const url = `${BASE_URL}/entity/getalltables`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching tables:', error.message);
    }
};

export const handleDeleteTable = async (table_name) =>{
    try {
        const url = `${BASE_URL}/entity/deletetable`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ table_name: table_name })
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error deleting table:', error.message);
    }
};

export const handlefetchTableDetails = async (tableName) =>{
  try {
      const url = `${BASE_URL}/entity/tabledetails`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableName: tableName })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching table details:', error.message);
  }
};

export const handleUpdateTableData = async (rowValues) =>{
  try {
      const url = `${BASE_URL}/entity/updatedata`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rowValues})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching table details:', error.message);
  }
};

export const handleDeleteTableData = async (deleteData) =>{
  try {
      const url = `${BASE_URL}/entity/deletedata`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({deleteData})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching table details:', error.message);
  }
};

export const handleInsertTableData = async (entries) =>{
  try {
      const url = `${BASE_URL}/entity/insertdata`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({entries})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching table details:', error.message);
  }
};