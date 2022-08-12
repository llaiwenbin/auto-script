import BaseTask from "./BaseTask.js";
import { sleep } from "../utils/index.js";
export default class GwTask extends BaseTask {
    constructor(name) {
        super(name);
    }

    async init() {
        // 设置cookie等信息
        await sleep()
    }

    getUserInfo() {
        return `用户信息`
    }

}
