<template>
  <div id="app">
    <p> some text </p>
    <input v-model.lazy="directoryName" placeholder="">
    <input v-model.lazy="fileName" placeholder="" size="50">
    <button v-on:click="getNoteDocument">Get Note Document 1</button>
    <input v-model="directory" placeholder="directory">
    <!-- <p>Directory is: {{directory}}</p> -->
    <!--
    <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App 1"/> -->
    <textarea type="textarea" v-model="debugText">
    <div id="noteDocOutline"></div>
    </textarea>
    <sl-vue-tree id="file-tree" v-model="nodes" @nodeclick="nodeClick"/>
  </div>
</template>

<script src="sl-vue-tree.js"></script>

<script>
// LL: this is not necessary: import Vue from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import SLVueTree from 'sl-vue-tree'

var nodes = [
  {title: 'Item1', isLeaf: true},
  {title: 'Item2', isLeaf: true, data: { visible: false }},
  {title: 'Folder1'},
  {
    title: 'Folder2', isExpanded: true, children: [
      {title: 'Item3', isLeaf: true},
      {title: 'Item4', isLeaf: true}
    ]
  }
];

export default {
  name: 'App',
  components: {
    // HelloWorld
    SLVueTree
  },
  data() {
    return {
      directory: '',
      directoryName: '',
      fileName: '',
      debugText: '',
      nodes: nodes
    }
  },
  methods: {
    getNoteDocument: function() {
      console.log("getNoteDocument")
      console.log(this.directoryName)
      const params_obj = {params: {dir: this.directoryName, file: this.fileName}}
      // const params_obj = {params: {dir: 'AppDev', file: 'AppDevFW.Vue.nodoc'}}
      // https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
      const headers = {"Content-Type":"text/plain"}
      //const headers = {}
      axios.get('http://localhost:5010/api/parse', params_obj, headers)
      .then(function(response) {
        console.log(response)
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response.data, 'text/xml')
        var title = xmlDoc.getElementsByTagName('title')
        var win = window.open("", title)
        win.document.body.innerHTML = response.data
      })
      //.then(response => (this.debugText = response.data))
      // .then(response => (#noteDocOutline.setHTML(response.data)))
    },
    nodeClick(node, event) {
      console.log("nodeClick: " + event + " | " + node.isLeaf + ", " + node.title )
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
