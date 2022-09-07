import { notifyAll } from "../utils/notify.js";

export default class BaseEnv {
    constructor(name) {
        this.name = name;
        this.cookie = '';
        this.detailMsg = [];
        this.errMsg = [];
    }


    addDetailMsg({title,count}) {
        this.detailMsg.push({title,count});
    }

    addErrMsg(msg) {
        this.errMsg.push(msg);
    }

    async init() {
        console.log('需子类重写');
    }

    getUserInfo() {
        return '需子类重写\n';
    }

    async send() {
        let content = ''
        this.detailMsg.forEach(({title,count}) => {
            content += 
            `>名称:<font color=\"comment\">${title}</font>
            >库存:<font color=\"${count ? 'comment': 'warning'}\">${count}</font>
            >异常:<font color=\"warning\">${this.errMsg}</font>
            >------------------------
            `
        })
       
        await notifyAll(content);
    }
}