class authCus {
    constructor() {
        this.auth = sessionStorage.getItem('customerAccount') ? JSON.parse(sessionStorage.getItem('customerAccount')).isLogin : false;
    }
    login(cb) {
        this.auth = true;
        cb();
    }
    logout(cb){
        this.auth = false;
        cb();
    }
    isAuth(){
        return this.auth;
    }
}
export default new authCus();