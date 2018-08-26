
export var env = function (name) {
    if(process.argv.slice(2).filter(item => item.indexOf(name) !== -1).length) {
        env = () => true;
        return true;
    } else {
        env = () => false;
        return false;
    }
}