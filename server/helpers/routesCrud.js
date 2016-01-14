/**
 * MIDDLEWARE-RETURNING FUNCTIONS:
 * createDoc(ModelStr, tieToUser = false)
 * getAllDocsAndSend(ModelStr)
 * getDocAndSend(ModelStr)
 * getDocAndUpdate(ModelStr)
 * getDocAndDelete(ModelStr)
 *
 * getDocAndSendIfOwnerOrAdmin(ModelStr)
 * getDocAndDeleteIfOwnerOrAdmin(ModelStr)
 * getDocAndUpdateIfOwnerOrAdmin(ModelStr)
*/

const mongoose = require('mongoose')

export const ownerOrAdmin = (doc, user) => {
  if (!user) return;
  return doc.user === user._id || user.isAdmin
}

export const sendDocIfOwnerOrAdmin = (doc, user, res) => {
  if (ownerOrAdmin(doc, user)) res.json(order);
  else res.status(401).end();
};

// returns middleware
export const getDocAndSendIfOwnerOrAdmin = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findById(id)
    .then(document => {

      if (!document) res.status(404).send;
      else sendDocIfOwnerOrAdmin(user, id, res)
    })
    .then(null, next);
};

// returns middleware
export const getDocAndDeleteIfOwnerOrAdmin = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findById(id)
    .then(document => {
      if (!document) res.status(404).send;
      if (ownerOrAdmin(document, req.user)) {
        return document.remove();
      } else res.status(401).end();
    })
    .then(document => res.json(document))
    .then(null, next)
};

// returns middleware
export const getDocAndUpdateIfOwnerOrAdmin = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findById(id)
    .then(document => {
      if (!document) res.status(404).send;
      if (ownerOrAdmin(document, req.user)) {
        return Model.findByIdAndUpdate(document, req.body, {
          new: true
        });
      } else res.status(401).end();
    })
    .then(document => res.status(200).json(document))
    .then(null, next)
};



// returns middleware. No auth.
export const getAllDocsAndSend = ModelStr => (req, res, next) => {
  const Model = mongoose.model(ModelStr);

  Model.find()
    .then(documents => res.json(documents))
    .then(null, next);
}
// returns middleware. No auth.
export const getDocAndSend = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findById(id)
    .then(document => res.status(200).json(document))
    .then(null, next);
}

// returns middleware. No auth.
export const getDocAndUpdate = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findByIdAndUpdate(id, req.body, {
      new: true
    })
    .then(document => res.status(200).json(document))
    .then(null, next);
}

// returns middleware. No auth.
export const getDocAndDelete = ModelStr => (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model(ModelStr);

  Model.findByIdAndRemove(req.params.id)
    .then(document => {
      if (!document) res.status(404).send();
      else return res.json(document)
    })
    .then(null, next);
}

export const createDoc = (ModelStr, tieToUser = false) => (req, res, next) => {
  const Model = mongoose.model(ModelStr);
  if (tieToUser) req.body.user = req.user._id;

  Model.create(req.body)
    .then(document => res.status(201).json(document))
    .then(null, next);
}
