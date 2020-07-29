var cmp = {
     data: function(){
          return {
               status: 'loaded'
          }
     },
     template: '<p>Status: {{ status }}</p>'
}

new Vue({
     el: '#app',
     components: {
          'my-cmp': cmp
     }
});

new Vue({
     el: '#app2',
});