<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Data levelll</div>

                    <div class="card-body">
                        <div class="form-grou">
                             <div class="table-responsive">
                                 <table class="table">
                                     <tr>
                                         
                                         <th>Nama Level</th>
                                         <th>aksi</th>
                                     </tr>
                                     <tr v-for="item in levelss" :key="item.id">
                                         <td>{{item.nama_level}}</td>
                                         <td>Edit | hapus</td>
                                     </tr>
                                 </table>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       data(){
           return{
           levelss:{}
            };
        },
        methods:{
            loadData(){
                axios.get('http://localhost:8000/api/ambildatalevel').then(({data}) =>(this.levelss = data));    
            }
        },
        created(){
            this.loadData();
        }
    }
</script>
