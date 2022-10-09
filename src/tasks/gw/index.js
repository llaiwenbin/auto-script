import process from 'process'
import { getProductionInfo } from '../../api/gw.js'
import { sleep } from '../../utils/index.js';
import GwTask from '../../class/GwTask.js'

process.on('unhandledRejection', error => {
    console.log('我帮你处理了', error.message);
});

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

const promiseList = [promise1, promise2, promise3, promise4]



async function before() {
    await task.init();
}

async function execute() {
    await promiseList.reduce((pms, curr) => {
        pms.finally(() => sleep(500).then(curr))
        return curr
    }, Promise.resolve())
}

function after() {
    const haveCount = task.detailMsg.filter(res => +res.count).length

    if (++count >= 500 || haveCount) {
        count = 0
        task.send();
    }
    task.detailMsg = []
}