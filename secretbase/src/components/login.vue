<template>
    <div style="width:30%;margin: auto auto;margin-top: 10%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="帐号">
                <el-input v-model="form.username" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input v-model="form.password" maxlength="16" show-password></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button @click="onRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          form: {
            username:'',
            password:''
          },
          
        }
      },
      methods: {
        onSubmit() {
          var vm=this;
          if(this.form.username && this.form.password){
            this.$axios.post('/checkLogin',this.form)
              .then(function(response){
                console.log();
                console.log("true");
                console.log(response.data==="true")
                if(response.data==="formtrue"){
                  console.log("登录成功");
                  vm.$message({
                    message:'登录成功',
                    type:'success'
                  });
                  vm.$cookies.set("username",vm.form.username);
                  sessionStorage.setItem("token",vm.form.username+"_"+vm.form.password);
                  vm.$router.push({path:'/homepage'});
                }else{
                  vm.$message.error('登录失败，帐号或密码错误');
                }
                
              })
              .catch(function(err){
                console.log(err);
              })
          }else{
            this.$message.error('帐号或密码不能为空');
          }
        },
        onRegister(){
            this.$router.push({path:'/register'});
            
            
        },
        getusername(vm){
          var username=vm.$cookies.get("username");
          
          if(username==null){
            
          }else{
            vm.form.username=username;
          }
        }
      },
      mounted(){
        var vm=this;
        this.getusername(vm);
      }
    }
  </script>