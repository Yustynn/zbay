/**
 * MIDDLEWARE-RETURNING FUNCTIONS:
 * createDoc(ModelStr, tieToUser = false)
 * getDocsAndSend(ModelStr, refPropName = false)
 * getDocAndSend(ModelStr)
 * getDocAndUpdate(ModelStr)
 * getDocAndDelete(ModelStr)
 *
 * getDocAndSendIfOwnerOrAdmin(ModelStr)
 * getDocAndUpdateIfOwnerOrAdmin(ModelStr)
 * getDocAndDeleteIfOwnerOrAdmin(ModelStr)
*/


const mongoose = require('mongoose')


/**
 * INTERNAL HELPERS
 */
const ownerOrAdmin = (doc, user) => {
  if (!user) return;
  return doc.user === user._id || user.isAdmin
}

const sendDocIfOwnerOrAdmin = (doc, user, res) => {
  if (ownerOrAdmin(doc, user)) res.json(order);
  else res.status(401).end();
};

/**
 * EXPORTED FUNCTIONS
 */

export const createDoc = (ModelStr, tieToUser = false) => (req, res, next) => {
  const Model = mongoose.model(ModelStr);
  if (tieToUser) req.body.user = req.user._id;

  Model.create(req.body)
    .then(document => res.status(201).json(document))
    .then(null, next);
}

// returns middleware. No auth. Optionally also gets docs based on req.params.id
export const getDocsAndSend = (ModelStr, refPropName = false) => (req, res, next) => {
  const Model = mongoose.model(ModelStr);
  let query = {};
  if (refPropName) {
    query[refPropName] = req.params.id
  }

  Model.find(query)
    .then(documents => res.json(documents))
    .then(null, next);
}


// returns middleware. No auth.
export const getDocAndSend = ModelStr => (req, res, next) => {
  console.log("here I am");
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
