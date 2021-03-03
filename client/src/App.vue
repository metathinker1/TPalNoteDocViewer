<template>
  <div id="app">
    <p> some text </p>
    <button v-on:click="doSomething">Click Me!</button>
    <button v-on:click="getNoteDocument">Get Note Document 1</button>
    <input v-model="directory" placeholder="directory">
    <!-- <p>Directory is: {{directory}}</p> -->
    <!--
    <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App 1"/>
    <textarea type="textarea" v-model="debugText">
      
    </textarea>
  </div>
</template>

<script>
// LL: this is not necessary: import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      directory: '',
      debugText: ''
    }
  },
  methods: {
    doSomething: function() {
      console.log('doSomething')
      alert('clicked')
    },
    getNoteDocument: function() {
      // const params = {dir: {{directoryName}}, file: {{fileName}}}
      const params_obj = {params: {dir: 'AppDev', file: 'AppDevFW.Vue.nodoc'}}
      // https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
      const headers = {"Content-Type":"text/plain"}
      //const headers = {}
      axios.get('http://localhost:5010/api/parse', params_obj, headers)
      .then(response => (this.debugText = response.data))
    }
  }
}

// Oh yeah: new Vue() is also in main.js
// https://gist.github.com/yulvil/694655e1c9fff66533df5cdecc5ebe31
// new Vue({
//   el: '#app',
//   // data: object,
//   methods: {
//     dosomething: function () {
//       alert("clicked")
//     // `this` inside methods points to the Vue instance
//     // `event` is the native DOM event
//     // alert(event.target.tagName);
//     // this.counter += 1;
//     // this.message = 'Hello ' + (places[this.counter%4]) + '!';
//     }
//   }
// })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
