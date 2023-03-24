const db = require('../db')

async function processHeartRate(body) {
  const { clinical_data } = body
  const { data } = clinical_data.HEART_RATE

  if(!clinical_data || !clinical_data.HEART_RATE || !clinical_data.HEART_RATE.data)
    throw ('Heart rate data not found on the request.')


  data.forEach((element) => {
    element.on_date = new Date(element.on_date).getTime()
  })

  let initial_time = data[0].on_date + 900000
  let mapped_data = []
  let interval_data = []
  for (i = 0; i < data.length; i++) {
    if (data[i].on_date <= initial_time) {
      interval_data.push(parseInt(data[i].measurement))
    } else {
      mapped_data.push({
        from_date: new Date(initial_time - 900000),
        to_date:
          interval_data.length === 1
            ? new Date(initial_time)
            : new Date(data[i - 1].on_date),
        measurement: {
          low: Math.min(...interval_data),
          high: Math.max(...interval_data),
        },
      })
      interval_data = []
      interval_data.push(parseInt(data[i].measurement))
      initial_time = data[i].on_date + 900000
    }
  }
  await db.storeData({ rate: mapped_data })
  clinical_data.HEART_RATE.data = [...mapped_data]
  return { clinical_data }
}

module.exports = {
  processHeartRate,
}
