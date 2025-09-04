<template>
<h1>Registration Form</h1>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="name"
            :counter="25"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-select
            v-model="select"
            :items="items"
            :rules="selectRules"
            label="Role"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-date-picker
            color= "primary"
            v-model="date"
            :rules="dateRules"
            label="Date picker"
            required
          ></v-date-picker>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="success"
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateRules: [
        value => {
          if (value) return true

          return 'Selecting date is required.'
        },
      ],
      loading: false,
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
              date: this.date,
            };

            // Save file to Firestore(collection ' interns')
            const docRef = await addDoc(collection(db, 'interns'), formData);

            console.log('Document written with ID:', docRef.id);
            alert('Registration successful. Thank you for joining us!');

            // Reset form after success
            this.name = '';
            this.email = '';
            this.select = null;
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
          } catch (error) {
            console.error('Error submitting form:', error);
            alert('Registration failed. Please try again.');
          } finally {
            this.loading = false;
          }
        }
      }
    },
  }
</script>
<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-size: 40px;
  color: primary;
}
</style>