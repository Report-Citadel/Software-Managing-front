import request from "@/components/Utils/request";
// Send a GET request 
export function GetCode(Info) {
    return request({
        //发送GET请求
        method: 'get',
        url: '/yiyan',
        params: Info
    })
}

export function GetTest(Info) {
    return request({
        method: 'get',
        url: '/api/economylife/sutdentlab/test',
        params: Info
    })
}

//生成寿命周期POST
/**
 * 
 * @param {*} Info 
 * @returns 
 */
export function GetEconomicLife(Info) {
    return request({
        method: 'post',
        url: '/api/economylife/sutdentlab/generateEconomicLife',
        data: Info
    })
}

/**
 * @description 初始数据生成接口
 * @param {string} stuID student ID
 * @returns {object} 返回初始数据
 */
export function GetInitialData(stuID) {
    return request({
        method: 'get',
        url: '/api/economylife/sutdentlab/initialDataGenerate',
        params: stuID
    })
}

//获取历史数据GET
export function GetHistoryData(Info) {
    return request({
        method: 'get',
        url: '/api/economylife/sutdentlab/getHistoryData',
        params: Info
    })
}

//获取题目GET
export function GetQuestions(Info) {
    return request({
        method: 'get',
        url: '/api/economylife/sutdentlab/getQuestions',
        params: Info
    })
}

//暂存题目
export function SaveQuestions(Info) {
    return request({
        method: 'post',
        url: '/api/economylife/sutdentlab/saveQuestions',
        data: Info
    })
}

//获取分数
export function GetScore(Info) {
    return request({
        method: 'post',
        url: '/api/economylife/sutdentlab/getScore',
        data: Info
    })
}

//获取剩余时间
export function GetRestTime(Info) {
    return request({
        method: 'get',
        url: '/api/economylife/sutdentlab/getRestTime',
        params: Info
    })
}