import * as api from "../Services/api.js";
export const state = {
  menRelationShip: ['Self', 'Son', 'Son in law', 'Husband', 'Brother', 'Other'],
  womenRelationShip: ['Self', 'Daughter', 'Daughter in law', 'Wife', 'Sister', 'Other'],
  paymentMethods: ['Mail a check', 'Skip donation for now', 'Manual credit card entry'],
  requesting: ['Rosh Hashanah I', 'Rosh Hashanah II', 'Yom Kippur'],
  requests: [],
  snackData: {
    value: false,
    color: 'primary',
    text: ''
  },
  isEditRequest: false,
  response: null,
  person: {
    personId: 0,
    gender: null,
    title: null,
    firstName: null,
    lastName: null,
    isRequestOwner: false,
    homePhone: null,
    mobilePhone: null,
    preferredPhone: null,
    streetAddress: null,
    streetAddressLine2: null,
    city: null,
    state: null,
    zipCode: null,
    emailAddress: null,
    studentStatus: 'None',
    classOf: null,
    grade: null,
    yearBorn: null,
    shiur: null,
    personNote: null,
    isSarElef: false,
    isAlumnus: false,
    isFaculty: false,
    isKollel: false,
    isCurrentStudent: false,
    isYomimNoraimMispallel: false,
    isWeeklyMispallel: false,
    isOtherAffiliation: false
  },
  sampleRequest: {
    groupRequestId: 0,
    year: null,
    ownerId: null,
    owner: {},
    groupRequestNote: '',
    suggestedPayment: 0,
    pledgedPayment: 0,
    donationAmount: 0,
    paymentMethod: [],
    isPaid: false,
    paymentDate: '',
    referenceNumber: '',
    paymentNote: '',
    menPreferHistoricalSeat: false,
    menWillingToSwitch: false,
    menRequestingFewer: false,
    menRequestingFewerWhichKeep: '',
    menDetails: '',
    womenPreferHistoricalSeat: false,
    womenWillingToSwitch: false,
    womenRequestingFewer: false,
    womenRequestingFewerWhichKeep: '',
    womenCanShare: false,
    womenCanShareWith: '',
    womenDetails: '',
    menRequests: [],
    womenRequests: []
  },
  request: {
    individualRequestId: 0,
    groupRequestId: 0,
    gender: null,
    relationshipToOwner: '',
    otherRelationshipToOwner: '',
    personId: 0,
    rh1: false,
    unoccupiedRh1Night: false,
    rh2: false,
    unoccupiedRh2Night: false,
    yk: false,
    unoccupiedYkNight: false,
    person: {}
  },
  allRequests: [],
  groupRequest: {},
};
export const mutations = {
  NEW_GROUP_REQUEST(state){
    state.groupRequest = {
      ...state.sampleRequest
    }
  },
  SET_GROUP_REQUEST(state, payload){
    state.groupRequest = {
      ...payload
    }
    console.log(state.groupRequest, 'GroupRequest')
  },
  SET_EDIT_REQUEST(state, payload){
    state.isEditRequest = payload
  },
  SET_GROUP_OWNER(state, payload){
    const d = new Date()
    state.groupRequest.owner = {
      ...payload
    }
    state.groupRequest.ownerId = payload.personId
    state.groupRequest.year = d.getFullYear()
  },
  CREATE_SEAT(state, payload){
    state.request.person = {
      ...state.person
    }
    if(payload === 'men') state.groupRequest.menRequests.push(state.request)
    else state.groupRequest.menRequests.push(state.request)
    console.log(state.groupRequest)
  },
  ADD_SEAT(state, payload){
    console.log(state.groupRequest.menRequests)
    if(payload.person.gender === 'Male'){
      payload.addData.gender = 'Male'
      state.groupRequest.menRequests[payload.counter - 1] = {
        ...state.groupRequest.menRequests[payload.counter - 1],
        ...payload.addData
      }
      console.log(state.groupRequest.menRequests)
      state.groupRequest.menRequests[payload.counter - 1].person = {
        ...state.groupRequest.menRequests[payload.counter - 1].person,
        ...payload.person
      }
    }else{
      payload.addData.gender = 'Female'
      state.groupRequest.womenRequests[payload.counter - 1] = {
        ...state.groupRequest.womenRequests[payload.counter - 1],
        ...payload.addData
      }
      state.groupRequest.womenRequests[payload.counter - 1].person = {
        ...state.groupRequest.womenRequests[payload.counter - 1].person,
        ...payload.person
      }
    }
    console.log(state.groupRequest)
  },
  CREATE_WOMEN_REQUEST(state, payload){
    state.groupRequest.menRequests.push = payload
  },
  SET_RESPONSE(state, payload) {
    state.response = payload;
  },
  SET_PERSON(state, payload) {
    state.person = payload;
  },
  SET_ALL_REQUESTS(state, payload) {
    state.allRequests = payload
  },
  SET_REQUEST_DATA(state, payload){
    state.groupRequest = {
      ...state.groupRequest,
      ...payload
    }
    console.log(state.groupRequest)
  },
  UPDATE_PAYMENT(state, payload){
    const findIndex = state.allRequests.findIndex(item => item.groupRequestId === payload.requestId)
    console.log(state.allRequests[findIndex])
    // if(state.allRequests.length > 0){
    //   request = state.allRequests.map(function(item) {
    //     return item.groupRequestId === payload.requestId
    //   })

    // }
  },
};
export const getters = {
  person: ({ person }) => person,
  people: ({ people }) => people,
  sampleRequest: ({ sampleRequest }) => sampleRequest,
  snackData: ({ snackData }) => snackData,
  menRelationShip: ({ menRelationShip }) => menRelationShip,
  requesting: ({ requesting }) => requesting,
  womenRelationShip: ({ womenRelationShip }) => womenRelationShip,
  paymentMethods: ({ paymentMethods }) => paymentMethods,
  groupRequest: ({ groupRequest }) => groupRequest,
  allRequests: ({ allRequests }) => allRequests,
  isEditRequest: ({ isEditRequest }) => isEditRequest,
};
export const actions = {
  newGroupRequest({commit}){
    commit('NEW_GROUP_REQUEST')
  },
  async identifyPerson({ commit }, data) {
    return api.post('person/identifyPerson', data).then((response) => {
      commit('SET_RESPONSE', response)
      return response
    })
  },
  async createSeat({ commit }, data) {
    commit('CREATE_SEAT', data)
  },
  async setGroupOwner({ commit }, data) {
    commit('SET_GROUP_OWNER', data)
  },
  async addSeat({ commit }, data){
    commit('ADD_SEAT', data)
    console.log(data)
  },
  setRequestData({ commit }, data){
    commit('SET_REQUEST_DATA', data)
  },
  createGroupRequest({ commit, state }){
    console.log(...state.groupRequest, 'before')
    return api.post('groupRequest/createGroupRequest', {...state.groupRequest}).then((response) => {
      
      commit('SET_RESPONSE', response)
      console.log(response)
      return response
    })
  },
  editGroupRequest({ commit, state }){
    return api.post('groupRequest/editGroupRequest', {...state.groupRequest}).then((response) => {
      commit('SET_RESPONSE', response)
      console.log(response)
      return response
    })
  },
  getAllGroupRequest({ commit }){
    return api.get('groupRequest/getAllGroupRequests').then((response) => {
      commit('SET_ALL_REQUESTS', response.data)
      console.log(response.data, 'all requests')
    });
  },
  updatePayment({ commit }, data){
    commit('UPDATE_PAYMENT', data)
  },
  getGroupRequestForEdit({ commit }, data){
    return api.get('groupRequest/getGroupRequestForEdit?groupRequestId=' + data).then((response) => {
      if(response.code === 100) commit('SET_GROUP_REQUEST', response.data)
    });
  },
  setIsEditRequest({ commit }, data){
    commit('SET_EDIT_REQUEST', data)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
