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
            label="Select"
            required
          ></v-select>
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

          return 'Select is required.'
        }
      ],
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