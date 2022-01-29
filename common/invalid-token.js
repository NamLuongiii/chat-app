const INVALID_TOKENS = {}

function destroyToken(token) {
    INVALID_TOKENS[token] = true
}

function tokenIsValid(token) {
    if (!INVALID_TOKENS[token]) return true
    else return false
}

setTimeout(() => {
    clearList();
}, 10 * 24 * 60000);

function clearList () {

}

module.exports = {
    destroyToken,
    tokenIsValid,
}

// Viết 1 chức năng sắp xếp mảng

s = [2,0,1,5,4]

s2 = [0,1,2,3,4,5]