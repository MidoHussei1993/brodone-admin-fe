export class LoginModel {
  constructor() {
    this.grant_type = 'password';
    this.scope = 'webclient';
    // this.client_id = 'Taba@Services2022Client';
    // this.client_secret = 'Taba$ecritKey';
  }
  grant_type: string;
  scope: string;
  // client_id: string;
  // client_secret: string;
  username!: string;
  password!: string;
}
