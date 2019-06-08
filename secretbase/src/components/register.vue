<template>
    <div style="width:30%;margin: auto auto;">
        <el-form status-icon ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="帐号" prop="username">
                <el-input v-model="form.username" maxlength="16" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" maxlength="16" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword" >
              <el-input v-model="repassword" maxlength="16" type="password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" maxlength="26"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">注册</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
      data() {
        var checkpassword1=(rule, value, callback) => {
          var reg=/^(\d|[a-z]|[A-Z]){6,16}$/;
          if(value===''){
            
            callback(new Error('请输入密码'));
          }
          else if (!reg.test(value)) {
            callback(new Error('密码格式错误'));
          } else {
            callback();
          }
        };
        var checkpassword2=(rule, value, callback) => {
          if(this.repassword===''){
            
            callback(new Error('请再次输入密码'));
          }
          else if (this.repassword !== this.form.password) {
            callback(new Error('两次输入密码不一致'));
          } else {
            callback();
          }
        };
        var checkusername1=(rule, value, callback) => {
          var reg=/^(\d|[a-z]|[A-Z]){6,16}$/;

          if(this.form.username===''){
            
            callback(new Error('请输入用户名'));
          }
          else if (!reg.test(this.form.username)) {
            callback(new Error('用户名格式错误'));
          } else {
            callback();
          }
        };
        var checkusername2=(rule, value, callback) => {
          var reg=/^(\d|[a-z]|[A-Z]){6,16}$/;
          var vm=this;
          if(reg.test(this.form.username)){
            this.$axios.get('/checkName',{
              params:{
                "username":this.form.username
              }
            }).then(function(response){
              if(response.data=="success"){
                callback();
              }else{
                callback(new Error('用户名已存在'));
              }
            }).catch(function(err){
              vm.$message.error('注册失败,'+err);
            })
            
          }else{
            callback(new Error('用户名格式错误!!'));
          }
          
        };
        return {
          form: {
            username:'',
            password:'',
            nickname:'',

            email:''
          },
          repassword:'',
          rules: {
            username: [
              
              { required: true,validator: checkusername1, trigger: ['blur','change']},
              { validator: checkusername2, trigger: ['blur']}
            ],
            password: [
              { required: true, validator: checkpassword1, trigger: ['blur','change']},
              
            ],
            repassword: [
              { required: true,validator: checkpassword2, trigger: ['change','blur'] }
            ],
            nickname: [
              { required: true, message: '请输入昵称', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: ['blur','change'] }
            ],
            email: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { min: 6, max: 26, message: '长度在 6 到 26 个字符', trigger: ['blur','change'] },
              { type:'email',message: '请输入正确的邮箱地址',trigger: ['blur','change'] }
            ]
          },
          
        }
      },
      methods: {
        
        onSubmit(formName) {
          var vm=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('/addUser',this.form)
              .then(function(response){
                if(response.data==="formtrue"){
                  vm.$message({
                    message:'注册成功',
                    type:'success'
                  });
                  vm.$router.push({path:'/login'});
                }else{
                  vm.$message.error('注册失败，服务端故障');
                  
                }
                
              })
              .catch(function(err){
                console.log(err);
              })

              
            } else {
              this.$message.error('注册失败，表单数据格式错误');
              return false;
            }
          });
        },
        back(){
          this.$router.push({path:'/login'});
        }

      }
    }
  </script>