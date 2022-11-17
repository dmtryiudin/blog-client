import {convertDate} from "../utils/commonFunctions";

describe('convertDate function test', ()=>{
    test('function works without errors', ()=>{
        const res = convertDate('2021-08-30T10:36:31.923Z')
        expect(res).toEqual('30.08.2021 13:36')
    })

    test('function result with wrong data', ()=>{
        const res = convertDate('hi')
        expect(res).toBe('NaN.NaN.NaN NaN:NaN')
    })
})