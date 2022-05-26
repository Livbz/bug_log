var manage = new Vue({
    el: "#body",
    delimiters: ['${', '}'],
    data: {
        pagesum:10,
        index: 1,
        total: 0,
        total_pages: 0,
        ifin_selected: 'in',
        depart_selected: 'all',
        row_list: [],
        person_data: {
            username: '用戶名',
            ifin: 'in',
            dpcode: 'sales_dp'
        }
    },
    methods: {
        get_row_list: function(){
            let vm =  this
            console.log('index:',vm.index)
            axios.get('http://47.100.44.89:5000/electricityCalculator/get_row_list', {
                params: {
                    pagesum: vm.pagesum,
                    index: vm.index
                }
              })
            .then(response => {
                vm.row_list = response.data.res_list;
                vm.total = response.data.total;
                vm.total_pages = response.data.total_pages;
                console.log(response.data)
            }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error);})
              console.log('index:',vm.index)
        },
        get_one_info: function(event){
            let vm = this
            axios.post('/electricityCalculator/get_one_info', {
                id: event.target.value,
                })
                .then(function (response) {

                })
                .catch(function (error) {

                });

        },
        changepage: function(event){
            let vm = this
            vm.index = event.target.value
            console.log('event.target:',event.target)
            vm.get_row_list()
            console.log('index:',vm.index)
        }
    }
})
manage.get_row_list()