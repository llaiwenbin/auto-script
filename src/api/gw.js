// jd相关的api写在此文件下
import { post } from './index.js';


export const getProductionInfo = (params) => {
    const url = 'https://shop.canon.com.cn/jiekec/index.php?route=catalog/product/productinfo';
    return post(url, params, {
        qs: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}
