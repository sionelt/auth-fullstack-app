<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Profile",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      newPassword: "",
      updating: false,
      gettingUser: false,
      error: ""
    };
  },

  computed: {
    ...mapState(["currentUser"]),

    updateBtnText() {
      return this.updating ? "UPDATING..." : "UPDATE";
    },

    isFormValid() {
      return this.firstName && this.lastName && this.email;
    }
  },

  watch: {
    currentUser: {
      deep: true,
      immediate: true,
      handler(newUser) {
        this.firstName = newUser.firstName;
        this.lastName = newUser.lastName;
        this.email = newUser.email;
      }
    }
  },

  async created() {
    try {
      this.gettingUser = true;

      if (!this.currentUser._id) {
        await this.getCurrentUser();
      }
    } catch (error) {
      console.error(error);
      this.error = error.message;
    } finally {
      this.gettingUser = false;
    }
  },

  methods: {
    ...mapActions(["getCurrentUser", "updateCurrentUser"]),

    async updateProfile() {
      try {
        this.updating = true;
        await this.updateCurrentUser({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.newPassword
        });
      } catch (error) {
        console.error(error);
        this.error = error.message;
      } finally {
        this.updating = false;
      }
    }
  }
};
</script>

<template>
  <div class="container-fluid d-flex flex-column h-100 align-items-center justify-content-center">
    <div class="row w-100">
      <div class="col-xl-3 col-lg-5 col-md-7 mx-auto">
        <h1 class="text-primary text-center">Your Profile</h1>

        <b-button
          variant="link"
          class="mb-4 mx-auto"
          style="display: block;"
          @click="$router.push('/')"
        >Log out</b-button>

        <b-card no-body class="p-2">
          <b-card-body class>
            <div v-if="gettingUser">Loading your profile...</div>

            <template v-else>
              <b-form-group label="First Name" label-for="first-name">
                <b-form-input
                  v-model="firstName"
                  id="first-name"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </b-form-group>
              <b-form-group label="Last Name" label-for="last-name">
                <b-form-input
                  v-model="lastName"
                  id="last-name"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </b-form-group>
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  v-model="email"
                  id="email"
                  autocapitalize="none"
                  spellcheck="false"
                  required
                />
              </b-form-group>

              <b-form-group label="New Password" label-for="password">
                <b-form-input
                  v-model="newPassword"
                  id="password"
                  autocapitalize="none"
                  spellcheck="false"
                />
              </b-form-group>

              <b-button
                block
                variant="primary"
                class="mt-4"
                :disabled="!isFormValid"
                @click="updateProfile"
              >{{ updateBtnText }}</b-button>
            </template>

            <b-alert
              variant="danger"
              class="mt-4 mb-0"
              :show="error"
              v-if="error"
            >ERROR: {{ error }}</b-alert>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>
