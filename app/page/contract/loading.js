import './loading.less';

export default {
    isShowing: false,
    initial() {
        this.dom = this.dom || document.createElement('div');

        this.dom.innerHTML = `
            <div class="loading-mask"></div>
            <div class="loading-content">

            </div>
        `;

        document.body.appendChild(this.dom);
    },
    show(showMask = true) {
        if(this.isShowing) {
            return;
        }

        if(!this.dom) {
            this.initial();
        }

        if(!showMask) {
            this.dom.className += ' no-mask';
        } else {
            this.dom.className = this.dom.className.replace(' no-mask', '');
        }

        this.dom.style.display = 'block';
        this.isShowing = true;
    },
    hide() {
        this.dom.style.display = 'none';
        this.isShowing = false;
    }
}