import { getProductionInfo } from '../../api/gw.js'
import { sleep } from '../../utils/index.js';
import GwTask from '../../class/GwTask.js'


let task = new GwTask('官网 佳能相机');
let requestId = 0
let count = 0;

(async function start() {
    try {
        await before();
        await execute();
        after();
    } catch (error) {
        task.addErrMsg(reason.stack);
        task.send();
    }

    await sleep(2000)
    start()
})()

async function before() {
    await task.init();
}

async function execute() {
    await getProductionInfo({
        'sess_id': 'sess_bcnicnargbr8o1a5m63hrtimil',
        'product_id': '3026',
    }).then(({ data }) => {
        console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
        task.setCount(data.quantity)
    })
}

function after() {
    if(++count > 100 || +task.count){
        count = 0
        task.send();
    }
}

