<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn>
        Become an Influencer
      </v-btn>
      <v-btn>
        Log In
      </v-btn>
      <v-btn>
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Groover'
    }
  }
}
</script>
