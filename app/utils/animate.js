
const tween = {
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    }
};


export default (function () {
    var isAnimating = false;
    const update = function(dom, propertyName, pos) {
        dom.style[propertyName] = pos + 'px';
    };

    const step = function(dom, startTime, duration, startPos, endPos, easing, propertyName) {
        let t = Date.now();
        if(t - startTime - duration >= 0) {
            update(dom, propertyName, endPos);
            return false;
        }
        let pos = tween[easing](t - startTime, startPos, endPos - startPos, duration);
        update(dom, propertyName, pos);
    };
    
    return function animate(dom, propertyName, endPos, duration, easing) {
        if(isAnimating) return;

        isAnimating = true;
        let startTime = Date.now(),
            startPos = dom.getBoundingClientRect()[propertyName],
            timeId = null;
        ;

        timeId = setInterval(x => {
            if(step(dom, startTime, duration, startPos, endPos, easing, propertyName) === false) {
                clearInterval(timeId);
                isAnimating = false;
            }
        }, 19);
    };
})();