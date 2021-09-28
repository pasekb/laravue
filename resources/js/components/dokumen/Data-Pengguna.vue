<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                       <h3>Data Pengguna</h3>
                       <div><button type="button" class="btn btn-success" @click="showModal">tambah</button></div>
                    </div>
                        <table class="table mt-2">
                            <thead>
                                <tr>
                                <th scope="col">user</th>
                                <th scope="col">Level</th>
                                <th scope="col">Email</th>
                                <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        <!-- Modal -->
<div class="modal fade" id="modalmuncul" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="simpanData">
      <div class="modal-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama Pengguna</label>
                <input type="text" v-model="form.name" class="form-control">
            </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nama Level</label>
                        <label for="exampleInputEmail1">level</label>
                            <select class="form-control select2" v-model="form.level_id">
                                <option value>pilih level -</option>
                                <option v-for="item in levelss" :key="item.id" :value="item.id">{{item.nama_level}}</option>
                            </select>
                    </div>
                    <div class="form-group">
                            <label for="exampleInputEmail1">email</label>
                            <input type="text" class="form-control" v-model="form.email">
                    </div>
                    <div class="form-group">
                            <label for="exampleInputEmail1">password</label>
                            <input type="password" class="form-control" v-model="form.password">
                    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
      </form>
    </div>
    
  </div>
  
</div>
    </div>
</template>

<script>
    export default {
       data(){
           return{
               levelss: {},
               form: new Form
               ({
                   id:"",
                   name: "",
                   level_id: "",
                   email: "",
                   password: ""
               }) 
           };
       },
       methods:{
        showModal(){
            this.form.reset();
            $("#modalmuncul").modal("show");
        },
        loadData(){
                axios.get('http://localhost:8000/api/ambildatalevel').then(({data}) =>(this.levelss = data));    
            },
            simpanData(){
                 this.form.post('api/user').then(()=>{
                     $("#modalmuncul").modal("hide");
                 })
                 .catch();
            }
       },
       created(){
           this.loadData();
       }
    }
</script>
