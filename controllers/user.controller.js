export const listUser = (req, res) => {
  // code body
  res.json({ message: "This is List All Users" });
};

export const readUser = (req, res) => {
  res.json({ message: "This is Read User" });
};

export const createUser = (req, res) => {
  res.json({ message: "This is Create User" });
};

export const replaceUser = (req, res) => {
  const {id} = req.params
  res.json({ message: `This is Replace User id = ${id}` });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `This is Update User id = ${id}` });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `This is Delete User id = ${id}` });
};