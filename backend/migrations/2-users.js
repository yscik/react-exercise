import user from "../app/user.js";

export default async function() {
  const demoUsers = [
    {username: 'demo', password: 'demo'}
  ];

  for(let userinfo of demoUsers) {
    await user.createUser(userinfo)
  }
}