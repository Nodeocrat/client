export default {
  user: {
    initialized: false,
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
      updatedSuccess: []
    },
    linkedProfiles: {
      facebook: {
        errors: [],
        updatedSuccess: []
      },
      google: {
        errors: [],
        updatedSuccess: []
      }
    }
  },

  login: {
    errors: {}
  }
};
