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
        task.addErrMsg(error);
    }

    await sleep(2000)
    start()
})()




const promise1 = () => getProductionInfo({
    'product_id': '3026',
}).then(({ data }) => {
    console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
    task.addDetailMsg({
        title: 'r10 m18-150',
        count: data.quantity
    })
})

const promise2 = () => getProductionInfo({
    'product_id': '3024',
}).then(({ data }) => {
    console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
    task.addDetailMsg({
        title: 'r10 m45',
        count: data.quantity
    })
})
const promise3 = () => getProductionInfo({
    'product_id': '2578',
}).then(({ data }) => {
    console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
    task.addDetailMsg({
        title: 'M50 Mark II(白)',
        count: data.quantity
    })
})

const promise4 = () => getProductionInfo({
    'product_id': '2579',
}).then(({ data }) => {
    console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
    task.addDetailMsg({
        title: 'M50 Mark II(黑)',
        count: data.quantity
    })
})





async function before() {
    await task.init();
}

async function execute() {
    await Promise.all([promise1(), promise2(), promise3(), promise4()])
}

function after() {
    const haveCount = task.detailMsg.filter(res => +res.count).length

    if (++count >= 500 || haveCount) {
        count = 0
        task.send();
    }
    task.detailMsg = []
}