export const getUID = authHeader => {
    return authHeader.split(' ')[1];
}