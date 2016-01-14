export const OwnerOrAdmin = (doc, user) => {
  return doc.user === user._id || user.isAdmin
}

export const sendDocIfOwnerOrAdmin = (doc, user, res) => {
  if (OwnerOrAdmin(doc, user)) res.json(order);
  else res.status(401).end();
};

// returns middleware
export const getDocAndSendIfOwnerOrAdmin = Model => (req, res, next) => {
  let id = req.params.id;
  Model.findById(id)
    .then(document => sendDocIfOwnerOrAdmin(user, id, res))
    .then(null, next);
};

// returns middleware
export const getDocAndDeleteIfOwnerOrAdmin = Model => (req, res, next) => {
  let id = req.params.id;
  Model.findById(id)
    .then(document => {
      if (isOwnerOrAdmin(doc, req.user))
        return doc.remove();
      else res.status(401).end();
    })
    .then(document => res.json(document))
};

// returns middleware
export const getDocAndUpdateIfOwnerOrAdmin = Model => (req, res, next) => {
  let id = req.params.id;
  Model.findById(id)
    .then(document => {
      if (isOwnerOrAdmin(document, req.user)) {
        return Model.findByIdAndUpdate(document, req.body, {new: true});
      }
      else res.status(401).end();
    })
    .then(document => res.json(document))
};
