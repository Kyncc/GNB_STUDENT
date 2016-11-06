import {
    GET_REPORT_DETAIL_SUCCESS,
    GET_REPORT_CHAPTER_SUCCESS,
    REPORT_CHANGE_SUBJECT
} from '../mutationTypes'

const state = {
    chapter:[
        {
            "name": "必修一",
            "textbook_id": 1,
            "chapter_list": 
            [
                {
                    "chapter_id": 75463,
                    "name": "第一章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第二章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第三章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第四章"
                }
            ],
        },
        {
            "name": "必修一",
            "textbook_id": 1,
            "chapter_list": 
            [
                {
                    "chapter_id": 75463,
                    "name": "第一章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第二章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第三章"
                },
                {
                    "chapter_id": 75463,
                    "name": "第四章"
                }
            ],
        }
    ],
    detail:{
        "chapter_name":'第一章asdasdasasd',
        "degree_level":{
            "level1_count": 635,
            "level1_percentage": "61%",
            "level2_count": 68,
            "level2_percentage": "63%",
            "level3_count": 800,
            "level3_percentage": "67%"
        },
        "error_reason":{
             "error1":"50%",   
             "error2":"60%",
             "error3":"70%",
             "error4":"80%",
             "error5":"90%"
        },
        "record_times": {
            "greater_twenty_time": 24541,
            "less_five_time": 86040,
            "less_twenty_time": 54733,
            "loose_time": 72707,
            "win_time": 85750
        }
    },
    currentSubId:'',
}

const mutations = {
  [GET_REPORT_CHAPTER_SUCCESS](state, data) {
      state.chapter = data.data;
  },
  [REPORT_CHANGE_SUBJECT](state,data){
      state.chapter = data.data;
  },
  [GET_REPORT_DETAIL_SUCCESS](state, data) {
      state.detail = data.data;
  }
}

export default {
  state,
  mutations
}
