import user from "../app/user.js";

export default async function() {
  const demoUsers = [
    {username: 'demo', password: 'demo'}
  ];

  for(let userinfo of demoUsers) {
    const userid = await user.createUser(userinfo);
    await user.addUserCity({user: {userid}, city: 'Budapest'})
  }
}