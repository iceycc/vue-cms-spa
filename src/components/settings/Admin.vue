<template>
<section class="container">
  <div class="col-md-5">
    <div class="subhead">
      <h2>修改密码</h2>
    </div>
    <hr>
    <form>
      <div class="form-group">
        <label for="exampleInputPassword1">当前密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">新的密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">确认密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
      </div>
      <button type="submit" class="btn btn-success">保存</button>
    </form>
    <div class="subhead">
      <h2>注销账号</h2>
      <hr>
    </div>
    <div>
      <p>一旦注销，不可找回，请谨慎操作</p>
      <button class="btn btn-danger">删除</button>
    </div>
    <hr>
  </div>
</section>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
