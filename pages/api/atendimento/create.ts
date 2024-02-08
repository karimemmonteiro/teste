export default (req, res) => {
    const { username, password } = req.body;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    res.status(200).json({ success: true });
  };
  