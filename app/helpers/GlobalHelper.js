module.exports = {
    response : (success, message, data) => {
        return {
            success : success,
            message : message,
            data : data ?? null,
        }
    }
}