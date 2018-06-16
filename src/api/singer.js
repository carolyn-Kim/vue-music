import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        songstatus: 1,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 30,
        singermid: singerId,
        g_tk: 1039738238
    })
    return jsonp(url, data, options)
}

export function getSongVKey(songmid) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const jsoncall = 'MusicJsonCallback' + (Math.random() + '').replace('0.', '')

    const data = Object.assign({}, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        callback: jsoncall,
        uin: 0,
        songmid: songmid,
        filename: `C400${songmid}.m4a`,
        guid: 4425761532
    })
    const opt = {
        param: 'jsonpCallback',
        name: jsoncall
    }
    return jsonp(url, data, opt)
}
