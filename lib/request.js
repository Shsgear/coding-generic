const axios = require('axios');

/**
 * 获取已经上传完成的分片信息
 * @param {string} requestUrl
 * @param {string} version
 * @param {string} fileTag
 * @param {string} Authorization
 */
const getExistChunks = (requestUrl, {
    version,
    fileTag
}, { 
    Authorization
}) => {
    return axios.post(`${requestUrl}?version=${version}&fileTag=${fileTag}&action=part-init`, {}, {
        headers: { Authorization }
    })
}

/**
 * 单个分片上传
 * @param {string} requestUrl 
 * @param {string} uploadId
 * @param {string} version
 * @param {number} partNumber 从 1 开始
 * @param {number} size 分片大小
 * @param {string} form 
 * @param {string} headers
 * @param {string} Authorization
 */
const uploadChunk = (requestUrl, {
    uploadId, 
    version,
    partNumber, 
    size, 
    form,
}, {
    headers,
    Authorization
}) => {
    return axios.post(`${requestUrl}?version=${version}&uploadId=${uploadId}&partNumber=${partNumber}&size=${size}&action=part-upload`, form,
        {
            headers: { Authorization, ...headers }
        }
    )
}

/**
 * 完成分片上传
 * @param {string} requestUrl 
 * @param {string} version
 * @param {string} uploadId
 * @param {string} fileTag
 * @param {number} fileSize
 * @param {string} Authorization
 */
const uploadSuccess = (requestUrl, {
    version,
    uploadId,
    fileTag,
    fileSize
}, {
    Authorization
}) => {
    return axios.post(`${requestUrl}?version=${version}&uploadId=${uploadId}&fileTag=${fileTag}&size=${fileSize}&action=part-complete`, {}, {
        headers: { Authorization }
    })
}

module.exports = {
    getExistChunks,
    uploadChunk,
    uploadSuccess
}