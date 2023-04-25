export const getError = (error) => {
    return error.response && error.response.data.message //if message with status 404 exists
    ? error.response.data.message
    : error.message
}

export const br = process.env.BACKEND_URL