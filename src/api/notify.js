// 发送通知相关的api写在此文件下
import { post } from "./index.js"

export function sendByQYWX(content) {
    const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=be218c22-0f4f-47aa-a448-e3022208ff88';
    return post(url, {
        msgtype: 'markdown',
        markdown: { content }
    })
}
