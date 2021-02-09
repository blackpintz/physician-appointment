const currentUser = () => {
  const user = localStorage.getItem('user');
  return (user);
};

export default currentUser;
