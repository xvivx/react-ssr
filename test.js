var p1 = function () {
    return new Promise(r => {
        setTimeout(() => {
            console.log('p11');
            r();
        }, 1000);
    });
};

var p2 = function () {
    return new Promise(r => {
        setTimeout(() => {
            console.log('p22')
            r()
        }, 1000);
    });
};
var p11 = p1();
var p22 = p2();


async function a() {
    console.log(1);
    await p11;
    alert(1)
    await p22;


    return 1111
}

a().then(r => r).catch(e => { console.log(e) })