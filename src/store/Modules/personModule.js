
import * as api from "../Services/api.js";
export const state = {
  gender: ['Male', 'Female'],
  title: {
    Male: ['Mr.', 'Dr.', 'Rabbi'],
    Female: ['Mrs.', 'Ms.'],
  },
  usStates: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
  preferredPhone: ['Home', 'Mobile'],
  affiliation: ['Sar Elef', 'Alumnus', 'Faculty', 'Kollel', 'Current student', 'Yomim Noraim Mispallel', 'Weekly Mispallel', 'Other'],
  studentStatus: ['Yeshiva Ketanah', 'Mesivta', 'Beis Medrash'],
  grade: ['5th grade', '6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade'],
  MensRelationShip: ['Son', 'Son in law', 'Husband', 'Brother', 'Other'],
  paymentMethods: ['Mail a check', 'Skip donation for now', 'Manual credit card entry'],
  snackData: {
    value: false,
    color: 'primary',
    text: ''
  },

  response: null,
  person: null,
  people: null,
};
export const mutations = {
  SET_RESPONSE(state, payload) {
    state.response = payload;
  },
  SET_PERSON(state, payload) {
    state.person = payload;
  },
  SET_PEOPLE(state, payload) {
    state.people = payload
  },
  SET_SNACK_DATA(state, payload) {
    state.snackData = payload
  },
  DELETE_PERSON(state, payload) {
    const findIndex = state.people.findIndex(({ personId }) => personId === payload)
    state.people.splice(findIndex, 1)
  },
  FILTER_BY_GENDER(state, payload){
    state.people = state.people.filter(function(item) {
      return payload.includes(item.gender)
    })
  }
};
export const getters = {
  gender: ({ gender }) => gender,
  title: ({ title }) => title,
  usStates: ({ usStates }) => usStates,
  preferredPhone: ({ preferredPhone }) => preferredPhone,
  affiliation: ({ affiliation }) => affiliation,
  studentStatus: ({ studentStatus }) => studentStatus,
  grade: ({ grade }) => grade,
  person: ({ person }) => person,
  people: ({ people }) => people,
  snackData: ({ snackData }) => snackData,
  MensRelationShip: ({ MensRelationShip }) => MensRelationShip,
  paymentMethods: ({ paymentMethods }) => paymentMethods,
};
export const actions = {
  async createPerson({ commit }, data) {
    return api.post('person/createPerson', data).then((response) => {
      commit('SET_RESPONSE', response.data)
      return response
    });
  },  
  async editPerson({ commit }, data) {
    if(data.createdAt) delete data.createdAt
    if(data.updatedAt) delete data.updatedAt
    return api.post('person/editPerson', data).then((response) => {
      commit('SET_RESPONSE', response.data)
      return response
    })
  },
  async deletePerson({ commit }, data) {
    return api.post('person/deletePerson?personId=' + data, data).then((response) => {
      if(response.success){
        commit('DELETE_PERSON', data)
        return {
          success: true,
          message: 'Delete successfully!',
          error: ''
        }
      }else{
        return {
          success: true,
          message: 'This person has associated request and assignment records, and cannot be deleted.',
          error: ''
        }
      }
    })
  },
  async getAllPeople({ commit }) {
    return api.get('person/getAllPeople').then((response) => {
      commit('SET_PEOPLE', response.data)
    });
  },
  async filterByGender({ commit }, data) {
    commit('FILTER_BY_GENDER', data)
  },
  async setPerson({ commit }, data) {
    commit('SET_PERSON', data)
  },
  async setSnackData({ commit }, data) {
    commit('SET_SNACK_DATA', data)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
