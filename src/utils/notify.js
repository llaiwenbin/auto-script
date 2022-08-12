// 通知工具类 支持通过企业微信机器人发送通知
import { sendByQYWX } from "../api/notify.js";
const config = {
    "open": true,
}

export async function notifyAll(content) {
    if (!config.open) {
        return Promise.resolve();
    }
    console.log(content);
    await sendByQYWX(content).then(res =>{
        console.log(res);
    }).catch(err =>{
        console.log(err);
    });
}
