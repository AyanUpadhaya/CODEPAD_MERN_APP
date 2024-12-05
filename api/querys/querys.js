const { pool } = require("../db/db");

const create = async (prop) => {
  const INSERT_QUERY = `
    INSERT INTO PublicCodePosts (title, about, language, code, timestamp, name, email, secret)
    VALUES (?, ?, LOWER(?), ?, ?, ?, ?, ?);
  `;

  const SELECT_QUERY = `
    SELECT * FROM PublicCodePosts WHERE id = ?;
  `;

  let client;

  try {
    client = await pool.getConnection();

    // Destructure and include `secret`
    const { title, about, language, code, timestamp, name, email, secret } =
      prop;

    // Insert data
    const [insertResult] = await client.query(INSERT_QUERY, [
      title,
      about,
      language,
      code,
      timestamp,
      name,
      email,
      secret, // Include secret in the values
    ]);

    // Fetch the newly inserted row using the insertId
    const [rows] = await client.query(SELECT_QUERY, [insertResult.insertId]);

    return rows[0]; // Return the first (and only) row as an object
  } catch (error) {
    console.error(
      "Error occurred while creating PublicCodePosts:",
      error.message
    );
    throw error;
  } finally {
    if (client) {
      client.release(); // release the connection back to the pool
    }
  }
};

const findByEmail = async (email) => {
  const QUERY = `SELECT * FROM publiccodeposts WHERE email = ?`;
  let client;

  try {
    client = await pool.getConnection();
    const [rows] = await client.query(QUERY, [email]);
    return rows[0];
  } catch (error) {
    console.error("Error occurred while getting post by email:", error);
    throw error;
  } finally {
    if (client) client.release();
  }
};

const find = async () => {
  const QUERY = `SELECT id, title, about, language, code, timestamp, name, email FROM publiccodeposts`;
  let client;
  try {
    client = await pool.getConnection();
    const result = await client.query(QUERY);
    return result[0];
  } catch (error) {
    console.log("Error occured while finding all the records");
    throw error;
  } finally {
    if (client) client.release();
  }
};

const findById = async (id) => {
  const QYERY =
    "SELECT id, title, about, language, code, timestamp, name, email FROM publiccodeposts WHERE id = ?";
  let client;
  try {
    client = await pool.getConnection();
    const result = await client.query(QYERY, [id]);
    return result[0][0];
  } catch (error) {
    console.log("Error occured while finding the record");
    console.log(error);
  } finally {
    if (client) client.release();
  }
};

const updateByIdAndSecret = async (update, id, secret) => {
  const QUERY = `UPDATE publiccodeposts SET ? WHERE id = ? AND secret = ?`;
  const SELECT_QUERY = `
    SELECT id, title, about, language, code, timestamp, name, email FROM publiccodeposts WHERE id = ?;
  `;
  let client;
  try {
    client = await pool.getConnection();
    const [result] = await client.query(QUERY, [update, id, secret]);
    if (result.affectedRows === 0) {
      throw new Error("Post not found or invalid secret !!");
    }

    // Fetch the newly inserted row using the insertId
    const [rows] = await client.query(SELECT_QUERY, [id]);

    return rows[0]; // Return the first (and only) row as an object
  } catch (error) {
    console.error("Error occurred while updating the post:", error.message);
    throw error;
  } finally {
    if (client) client.release();
  }
};
const deleteByIdAndSecret = async (id, secret) => {
  const QUERY = `DELETE FROM publiccodeposts WHERE id = ? AND secret = ?`;
  let client;
  try {
    client = await pool.getConnection();
    const result = await client.query(QUERY, [id, secret]);
    return result[0]; // Return the result of the delete operation
  } catch (error) {
    console.error("Error occurred while deleting the post:", error.message);
    throw error;
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  create,
  findByEmail,
  find,
  findById,
  updateByIdAndSecret,
  deleteByIdAndSecret,
};
