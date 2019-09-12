<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title large v-text="title" />
      <v-spacer />
      <v-btn text>
        Become an Influencer
      </v-btn>
      <v-btn text>
        Log In
      </v-btn>
      <v-btn outlined color="orange">
        Sign up
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Groover'
    }
  }
}
</script>
