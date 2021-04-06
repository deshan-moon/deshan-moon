export default function ({ store, redirect }) {
  // 验证用户是否登录
  if (!store.state.user) {
    return redirect('/login')
  }
}