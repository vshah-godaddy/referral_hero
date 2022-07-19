module.exports = {
    Response(type, message, data, displayMessage, code) {
    let defaultCode = type == 'success' ? 200 : 500;
    return {
        code: code || defaultCode,
        message,
        data,
        displayMessage
    }
}};