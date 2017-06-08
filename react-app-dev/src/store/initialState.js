export default {
  user: {
    initialized: true,
    profile: null,
    linkedProfiles: {
      facebook: null,
      google: null
    }
  },

  account: {
    profile: {
      editMode: false,
      errors: {},
      actions: []
    },
    linkedProfiles: {
      facebook: {
        errors: [],
        actions: []
      },
      google: {
        errors: [],
        actions: []
      }
    }
  },

  login: {
    errors: {}  
  }
};
