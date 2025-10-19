import { Client, TablesDB, ID } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const client = new Client().setProject(
    process.env.APPWRITE_FUNCTION_PROJECT_ID
  );

  if (req.headers['x-appwrite-user-jwt']) {
    client.setJWT(req.headers['x-appwrite-user-jwt']);
  } else {
    return res.text(
      'Access denied: This function requires authentication. Please sign in to continue.'
    );
  }

  const tablesDB = new TablesDB(client);

  try {
    await tablesDB.createRow({
      databaseId: '<DATABASE_ID>',
      tableId: '<TABLE_ID>',
      rowId: ID.unique(),
      data: {},
    });
  } catch (e) {
    log('Failed to create row: ' + e.message);
    return res.text('Failed to create row');
  }

  return res.text('Row created');
};
