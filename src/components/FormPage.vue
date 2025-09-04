<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="16" sm="12" md="10">
        <v-card class="mx-auto" max-width="500">
          <v-card-title class="text-h4 custom-title text-center font-weight-bold">
            Registration Form
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="submit">
              <v-container>
                <v-row >
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      :counter="25"
                      :rules="nameRules"
                      label="Name"
                      variant="outlined"
                      hint="Enter your name"
                      prepend-inner-icon="mdi-account"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      variant="outlined"
                      hint="Enter your e-mail"
                      prepend-inner-icon="mdi-email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="selectRules"
                      label="Role"
                      variant="outlined"
                      hint="Select your role"
                      prepend-inner-icon="mdi-briefcase"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-model="date"
                          :rules:="dateRules"
                          label="Date Joined"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          required
                          clearable
                          variant="outlined"
                          hint="Select your date"
                          v-bind="props"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        color="primary"
                        @update:modelValue = "dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    :disabled="loading"
                    :loading="loading"
                    color="primary"
                    class="mr-4"
                    size= "x-large"
                    variant="flat"
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  <!-- Add Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { db } from '../services/firebase';
import {collection, addDoc} from 'firebase/firestore';

  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        },
        value => {
          if (value?.length <= 25) return true

          return 'Name must be less than 25 characters.'
        },
      ],
      email: '',
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
      select: null,
      items: [
        'Developer',
        'Designer',
        'Tester',
        'project Manager',
      ],
      selectRules: [
        value => {
          if (value) return true

          return 'Selecting role is required.'
        }
      ],
      date: null,
      dateRules: [
        value => {
          if (value) return true

          return 'Selecting date is required.'
        },
      ],
      dateMenu: false,
      loading: false,
      snackbar: false,
      text: '',
      color: 'success',
      timeout: 2000,
    }),
    methods: {
      async submit () {
        if (this.valid) {
          this.loading = true;
          try {

            // Prepare data object
            const formData = {
              name: this.name,
              email: this.email,
              role: this.select,
              dateJoined: this.date,
              createdAt: new Date().toISOString(),
            };

            // Save file to Firestore(collection ' interns')
            const docRef = await addDoc(collection(db, 'interns'), formData);

            console.log('Document written with ID:', docRef.id);

            // Show success message
            this.text = 'Registration successful!';
            this.color = 'success';
            this.snackbar = true;

            // Reset form after success
            this.name = '';
            this.email = '';
            this.select = null;
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
          } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            this.text = 'Registration failed. Please try again.';
            this.color = 'error';
            this.snackbar = true;
          } finally {
            this.loading = false;
          }
        }
      }
    },
  }
</script>
<style scoped>
.v-card {
  background-color: #dadee6;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.custom-title {
  color: #1976D2;
}

.v-form {
  margin-top: 20px;
}

.v-btn {
  margin-top: 20px;
}

</style>