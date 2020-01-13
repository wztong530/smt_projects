import { get, post } from './http.js'

//主播搜索 列表 ?enterpriseId=[&content=gender=2&minFansCount=1&maxFansCount=10000&minLikeCount=0&maxLikeCount=10000&minAge=1&maxAge=1000&city=厦门&province=福建&page=1&pageSize=6 &orderBy=胶囊导航栏：最近发布 current_public_time、粉丝最多 fans_count、点赞最多 like_count]
export const searchList = params => post('interfaces/anchorSearch/searchList', params)
//主播排行 分类列表
export const categoryList = params => post('interfaces/anchorSearch/categoryList', params)
//主播排行 主播列表 ?enterpriseId=&categoryId=8&page=1&pageSize=6
export const anchorList = params => post('interfaces/anchorSearch/anchorList', params)
//主播详情 视频列表 ?anchorUuid=
export const videoList = params => post('interfaces/anchorSearch/videoList', params)
// 查看详情  年龄 ?content=[uuid=7& enterpriseId=7] 以下查看详情全一样参数
export const searchAge = params => post('interfaces/anchorSearch/searchAge', params)
// 查看详情  设备分布
export const searchDevice = params => post('interfaces/anchorSearch/searchDevice', params)
// 查看详情  地域
export const searchGeographical = params => post('interfaces/anchorSearch/searchGeographical', params)
// 查看详情  性别
export const searchGender = params => post('interfaces/anchorSearch/searchGender', params)
// 查看详情  粉丝数据活跃天数
export const searchActive = params => post('interfaces/anchorSearch/searchActive', params)
// 查看详情  粉丝数据兴趣
export const searchInterest = params => post('interfaces/anchorSearch/searchInterest', params)
// 景点词 Integer pageNo, Integer pageSize, String keyWord,String startTime,String endTime
export const hotSentence = params => post('interfaces/anchorSearch/hotSentence', params)
// 热点视频 Integer pageNo, Integer pageSize, String keyWord,String startTime,String endTime
export const hotSentenceVideo = params => post('interfaces/anchorSearch/hotSentenceVideo', params)


