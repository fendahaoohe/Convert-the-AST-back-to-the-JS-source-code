(function () {
    function bE(str, key) {
        var arr = str.split('');
        return arr.map(i => {
            return String.fromCharCode(i.charCodeAt() ^ key);
        }).join('');
    }
    console.log(bE('EXXH_Mpjx\x7FBxYnjggrM~eerv', 11));
}());
