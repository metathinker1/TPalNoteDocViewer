//https://dev.to/alirezahamid/how-to-fix-cors-issue-in-vuejs-545o
// module.exports = {
//   devServer: {
//         proxy: 'http://localhost:5010',
//     }
// }

//https://stackoverflow.com/questions/40315451/proxy-requests-to-a-separate-backend-server-with-vue-cli
// module.exports = {
//   devServer: {
//         proxy: {
//           "/*": {
//             target: 'http://localhost:5010',
//             secure: false,
//             changeOrigin: true
//           }
//         }
//     }
// }

//https://forum.vuejs.org/t/devserver-proxy-in-vue-config-js-not-working/87316/5
// module.exports = {
//   devServer: {
//     proxy: {
//       "^/api/": {
//         target: "http://localhost:8080",
//         pathRewrite: { "^/api/": "/api/" },
//         changeOrigin: true,
//         logLevel: "debug"
//       }
//     }
//   }
//   // ,
//   // configureWebpack: {
//   //   devtool: 'source-map'
//   // }
// };