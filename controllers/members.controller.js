export const getMembers = async (req, res, next) => {
  res.send("respond with all");
};

export const getMemberById = async (req, res, next) => {
  res.send("respond with only one");
};

export const createMember = async (req, res, next) => {
  res.send("respond with create");
};

export const updateMember = async (req, res, next) => {
  res.send("respond with update");
};

export const partialUpdateMember = async (req, res, next) => {
  res.send("respond with partial update");
};

export const deleteMember = async (req, res, next) => {
  res.send("respond with delete");
};
