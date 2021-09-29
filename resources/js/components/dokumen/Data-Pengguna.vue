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
                                <tr v-for="item in userss" :key="item.id">
                                <td>{{item.name}}</td>
                                <td>{{item.level_id}}</td>
                                <td>{{item.email}}</td>
                                <td><a href="#" @click="showModalEdit(item)"><i class="fa fa-edit blue"></i></a>
                                | <a href="#" @click="deleteData(item.id)"><i class="fas fa-trash red"></i></a>
                                </td>
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
        <h5 class="modal-title" id="exampleModalLabel" v-show="!statusmodal">
        Tambah Pengguna
        </h5>
        <h5 class="modal-title" id="exampleModalLabel" v-show="statusmodal">
        Ubah Pengguna
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent=" statusmodal ? ubahData() : simpanData()">
      <div class="modal-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama Pengguna</label>
                <input type="text" v-model="form.name" class="form-control" >
                
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
        <button type="submit" class="btn btn-primary" :disabled="disabled" v-show="!statusmodal">
        <i v-show="loading" class="fas fa-sync fa-spin"></i>
        Simpan
        </button>

        <button type="submit" class="btn btn-warning" :disabled="disabled" v-show="statusmodal">
        <i v-show="loading" class="fas fa-sync fa-spin"></i>
        Ubah
        </button>
        
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
               loading: false,
               disabled: false,
               levelss: {},
               userss:{},
               statusmodal: false,
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
            this.statusmodal = false;
            this.form.reset();
            $("#modalmuncul").modal("show");
        },
        showModalEdit(item){
            this.statusmodal = true;
            this.form.reset();
            $("#modalmuncul").modal("show");
            this.form.fill(item);
        },
        loadData(){
                this.$Progress.start();
                axios.get('http://localhost:8000/api/ambildatalevel').then(({data}) =>(this.levelss = data));
                axios.get('http://localhost:8000/api/user').then(({data}) =>(this.userss = data));    
                this.$Progress.finish();            
            },
            simpanData(){
                this.loading = true;
                this.disabled = true;
                this.form.post('api/user').then(()=>{
                     Fire.$emit("refreshData");
                     $("#modalmuncul").modal("hide");
                     Toast.fire
                    ({
                        icon: 'success',
                        title: 'Data Berhasil Tersimpan'
                    }); 
                    this.loading = false;
                    this.disabled = false;
                    })
                 .catch(()=> {
                    this.$Progress.fail();
                    this.loading = false;
                    this.disabled = false;
                 });
            },
            ubahData(){
                this.loading = true;
                this.disabled = true;
                this.form.put("api/user/"+ this.form.id).then(()=>{
                     Fire.$emit("refreshData");
                     $("#modalmuncul").modal("hide");
                     Toast.fire
                    ({
                        icon: 'success',
                        title: 'Data Berhasil Terupdate'
                    }); 
                    this.loading = false;
                    this.disabled = false;
                    })
                 .catch(()=> {
                    this.$Progress.fail();
                    this.loading = false;
                    this.disabled = false;
                 });
            },
            deleteData(id){
                Swal.fire
                    ({
                        title: "Yakin ingin menghapus data ini ?",
                        text: "klik batal untuk batal menghapus",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Hapus"
                    })
                    .then(result =>
                    {
                        if (result.value)
                        {
                            this.form.delete("api/user/" + id)
                            .then(()=>{
                                Swal.fire(
                                    "Terhapus",
                                    "Data Anda Sudah Terhapus",
                                    "success"
                                );
                                Fire.$emit("refreshData");
                            })
                            .catch(()=>{
                                Swal.fire(
                                    "Gagal",
                                    "Data Gagal Terhapus",
                                    "warning"
                                );
                            });
                        }
                    });
            }
       },
       created(){
           this.loadData();
           Fire.$on("refreshData",()=>{
               this.loadData();
           });
       }
    }
</script>
