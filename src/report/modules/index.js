import {
    GET_REPORT_DETAIL_SUCCESS,
    GET_REPORT_CHAPTER_SUCCESS,
    REPORT_CHANGE_SUBJECT,
    CHAPTER_STATE_CHANGE,
    REPORT_SCOLLER_HEIGHT,
    CLEAR_REPORT_CHAPTER
} from '../mutationTypes'

const mockstate = {
    chapter:[
        {
            "name": "必修一",
            "textbook_id": 1,
            "checked":true,
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
            "checked":true,
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
    subjectId:'',
    scoll:''
}

const state = {
     chapter:[],
     detail:{},
     subjectId:'2',
     scoll:0
}

const mutations = {
  [GET_REPORT_CHAPTER_SUCCESS](state, data) {
      state.chapter = data.data;
  },
  [REPORT_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  [CLEAR_REPORT_CHAPTER](state){
      state.chapter = [];
  },
  [REPORT_SCOLLER_HEIGHT](state,height){
      state.scoll = height;
  },
  [GET_REPORT_DETAIL_SUCCESS](state, data) {
      state.detail = data.data;
  },
  [CHAPTER_STATE_CHANGE](state,index){
      state.chapter[index].checked = !state.chapter[index].checked
  }
}

export default {
  state,
  mutations
}
