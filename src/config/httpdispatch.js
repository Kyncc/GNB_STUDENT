import Vue from 'vue'
import VueResource from 'vue-resource'
import {
    API_PATHS,
    OK_CODE,
    UNAUTHORIZED_CODE
} from './api';

Vue.use(VueResource)

export default {
  getCode: (params) => {
    return Vue.resource(API_PATHS.getCode).get(params)
  }
}