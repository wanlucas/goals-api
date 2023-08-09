// import User, { IUser } from '../../entity/User';
// import Create from './Create';
// import FindById from './FindById';
// import Login from './Login';

// export interface ILogin {
//   name: string;
//   password: string;
// }

// export interface ILoginOutput {
//   token: string;
//   id: string;
// }


// class UserUseCase {
//   constructor(
//     public login: (body: ILogin) => Promise<ILoginOutput>,
//     public findById: (id: string) => Promise<User>,
//     public create: (body: IUser) => Promise<void>,
//   ) { }
// }

// export default new UserUseCase(
//   new Login().execute,
//   new FindById().execute,
//   new Create().execute,
// );