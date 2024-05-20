const pool = require('../db');

const createTable = async (req, res) => {
  try {
    const { entityName, columns } = req.body;

    // Check if table with entityName already exists
    const checkTableQuery = `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    )`;
    const tableExistsResult = await pool.query(checkTableQuery, [entityName]);

    if (tableExistsResult.rows[0].exists) {
    return res.status(400).send({ error: "Table already exists", message: "Entity could not be created" });
    }

    // Ensure 'id' column exists
    const hasIdColumn = columns.some(column => column.name === 'id');
    if (!hasIdColumn) {
      columns.unshift({ name: 'id', type: 'SERIAL PRIMARY KEY' });
    }

    // Create table with entityName and columns if it doesn't exist
    let createTableQuery = `CREATE TABLE "${entityName}" (`;

    columns.forEach((column, index) => {
      createTableQuery += `${column.name} ${column.type}`;
      if (index < columns.length - 1) {
        createTableQuery += ', ';
      }
    });

    createTableQuery += ')';

    const createTableResponse = await pool.query(createTableQuery);

    res.status(200).send({ message: "Entity added successfully", createTableResponse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Entity could not be created" });
  }
};

const getAllTables = async(req, res) => {
  try {
    const allTablesQuery = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`;

    const allTablesQueryResponse = await pool.query(allTablesQuery);

    res.status(200).send({ message: "All Tables fetched successfully", allTablesQueryResponse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Tables not fetched" });
  }
};

const deleteTable = async(req, res) => {
  const {table_name} = req.body;
  try {
    const deleteTableQuery = `DROP TABLE "${table_name}"`;

    await pool.query(deleteTableQuery);

    res.status(200).send({ message: "Table deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Tables not deleted" });
  }
};

const tableDetails = async(req, res) => {
  const {tableName} = req.body;
  try {
    // Fetch column names
    const TableDetailsQuery1 = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
    const response1 = await pool.query(TableDetailsQuery1, [tableName]);

    // Fetch table data with date columns formatted to 'YYYY-MM-DD'
    const formattedColumns = response1.rows.map(col => {
      if (col.column_name.toLowerCase().includes('date')) {
        return `TO_CHAR(${col.column_name}, 'YYYY-MM-DD') AS ${col.column_name}`;
      }
      return col.column_name;
    }).join(', ');

    const TableDetailsQuery2 = `SELECT ${formattedColumns} FROM "${tableName}"`;
    const response2 = await pool.query(TableDetailsQuery2);

    const response = {
      response1,
      response2
    };

    res.status(200).send({ message: "Table details fetched successfully", response});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Table details not fetched" });
  }
};

const updateData = async(req, res) => {
  const {rowValues} = req.body;
  console.log(rowValues);
  const { id, tableName, ...columnsToUpdate } = rowValues;
  // Check if id and tableName are present
  if (!id || !tableName) {
    return res.status(400).send({ message: "ID and tableName are required" });
  }

  const setClause = Object.keys(columnsToUpdate)
    .map(key => `${key} = '${columnsToUpdate[key]}'`)
    .join(', ');

  try {
    const updateTableQuery = `UPDATE "${tableName}" SET ${setClause} WHERE id = ${id}`;
    const response = await pool.query(updateTableQuery);
    res.status(200).send({ message: "Table details updated successfully", response});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Table details not updated" });
  }
};

const deleteData = async(req, res) => {
  const {deleteData} = req.body;
  const {id, tableName} = deleteData;

  // Check if id and tableName are present
  if (!id || !tableName) {
    return res.status(400).send({ message: "ID and tableName are required" });
  }

  try {
    const deleteDataQuery = `DELETE FROM "${tableName}" WHERE id = ${id}`;
    const response = await pool.query(deleteDataQuery);
    res.status(200).send({ message: "Table data deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error, message: "Table data not deleted" });
  }
};

const insertData = async (req, res) => {
  const { entries } = req.body;
  const tableName = entries.tableName;

  if (!tableName) {
    return res.status(400).send({ message: "TableName is required" });
  }

  try {
    // Extracting and preparing entries data for insertion
    const rows = Object.keys(entries)
      .filter(key => key !== 'tableName')
      .map(key => entries[key]);

    // Construct the SQL query
    let columns = Object.keys(rows[0]);
    let values = rows.map(row => {
      let rowValues = columns.map(column => `'${row[column]}'`);
      return `(${rowValues.join(', ')})`;
    });

    const insertDataQuery = `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES ${values.join(', ')}`;
    
    // Execute the query
    const response = await pool.query(insertDataQuery);
    res.status(200).send({ message: "Data inserted successfully", response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message, message: "Data not inserted" });
  }
};


module.exports = {
  createTable,
  getAllTables,
  deleteTable,
  tableDetails,
  updateData,
  deleteData,
  insertData,
}
