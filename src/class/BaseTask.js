import { notifyAll } from "../utils/notify.js";

export default class BaseEnv {
    constructor(name) {
        this.name = name;
        this.cookie = '';
        this.count = 0;
        this.detailMsg = [];
        this.errMsg = [];
    }


    addDetailMsg(msg) {
        this.detailMsg.push(msg);
    }

    addErrMsg(msg) {
        this.errMsg.push(msg);
    }

    setCount(num){
        this.count = num
    }

    async init() {
        console.log('需子类重写');
    }

    getUserInfo() {
        return '需子类重写\n';
    }

    async send() {
        let content = 
       `>名称:<font color=\"comment\">m150</font>
        >库存:<font color=\"${this.count ? 'comment': 'warning'}\">${this.count}</font>
        >异常:<font color=\"warning\">${this.errMsg}</font>`
        await notifyAll(content);
    }
}