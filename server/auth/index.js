const router = require("express").Router();
const User = require("../db/models/user");
const { Order } = require("../db/models/index");
const { Product } = require("../db/models/index");
const { OrderItem } = require("../db/models/index");
module.exports = router;

router.post("/login", (req, res, next) => {
  User.findOne({ where: { email: req.body.email }, include: [{ all: true }] })
    .then(async user => {
      if (!user) {
        res.status(401).send("User not found");
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send("Incorrect password");

      } else {
        //add localStorage to db here
        // const cart = localStorage.cart
        const cart = {2:10, 1:10, 4:10, 3:12}
        const userorder = await Order.findAll({
          where: { userId: user.id, status: "incomplete" },
          include: [{ model: Product }]
        });
        for (const id in cart) {
          let flag = false;
          userorder[0].dataValues.products.forEach(async product => {
            if (id == product.dataValues.id) {
              flag = true;
              const userorderitem = await OrderItem.findAll({
                where: {
                  orderId: userorder[0].id,
                  productId: product.dataValues.id
                }
              });
              const updated = await userorderitem[0].update({
                quantity: cart[id]
              });
            }
          });
          if (flag === false) {
            const neworderitem = await OrderItem.create({
              orderId: userorder[0].id,
              productId: id,
              quantity: cart[id]
            });
          }
        }
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next);
});

//correctPassword is a prototypal method that hashes the submitted password & compares it to the one in db
//Passport creates a login function on req; when the login process is complete, req.user is set to user

router.post("/signup", (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(401).send("User already exists");
      } else {
        next(err);
      }
    });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

//Looks like it is possible to use the route above to send user data to client side.


router.use("/google", require("./google"));

