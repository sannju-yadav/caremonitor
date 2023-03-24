const db = require('./connection')

async function storeData(data) {
  const query = `INSERT INTO measurements.vitals (heart_rate) VALUES ('${JSON.stringify(
    data
  )}')`
  await db.client.query(query, (err, result) => {
    if (err) {
      throw new Error('Error inserting data into DB.')
    }
    console.log('Data inserted successfully')
  })
}

module.exports = {
  storeData,
}
