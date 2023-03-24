function errorHandler(status, err) {
  return {
    response: {
      status_code: status,
      message: err,
    },
  }
}

module.exports = {
  errorHandler,
}
