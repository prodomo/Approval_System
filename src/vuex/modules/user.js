const state = {
    main: {
        name: 'Alexander Pierce',
        position: 'Web Developer',
        state: {
            color: '#3c763d',
            name: 'Online'
        },
        createdAt: new Date()
    },
    user: {}
};

const mutations = {
    ['UPDATE_USER'](state, user) {
        if(user) {
            state.user = user;
        } else {
            state.user = {};
        }
    }
};

export default {
    state,
    mutations
}
