import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
    const url = '/api/lyric'

    const data = Object.assign({}, commonParams, {
        pcachetime: +new Date(),
        songmid: mid,
        platform: 'yqq',
        needNewCode: 0,
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
