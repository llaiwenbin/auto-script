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

    await sleep(1000)
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
        task.addDetailMsg({
            title: 'r10 m18-150',
            count: data.quantity
        })
    })
    await sleep(1000)

    await getProductionInfo({
        'sess_id': 'sess_bcnicnargbr8o1a5m63hrtimil',
        'product_id': '3024',
    }).then(({ data }) => {
        console.log(`【requestId】:${++requestId}\n【库存】:${data.quantity}`);
        task.addDetailMsg({
            title: 'r10 m45',
            count: data.quantity
        })
    })
}

function after() {
    const haveCount = task.detailMsg.filter(res => +res.count).length
    
    if(++count >= 500 || haveCount){
        count = 0
        task.send();
    }
    task.detailMsg = []
}

