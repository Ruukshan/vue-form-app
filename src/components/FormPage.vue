<template>
<h1>Registration Form</h1>
  <v-form v-model="valid">
    <v-container>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :rules="selectRules"
            label="Role"
            required
          ></v-select>
          <v-date-picker
            v-model="date"
            label="Date picker"
            required
          ></v-date-picker>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
          >
            Submit
          </v-btn>
    </v-container>
  </v-form>
</template>
<script>
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
          if (value?.length <= 10) return true

          return 'Name must be less than 10 characters.'
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
      date: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),
  }
</script>
<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-size: 40px;
  color: brown;
}
</style>