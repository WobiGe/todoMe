export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ){}

  get userToken(){
    //check if token expired
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }else{
      return this._token;
    }
  }
}
