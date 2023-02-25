const express = require("express")
const router = express.Router();
const Admin = require("../model/admin");
const User = require("../model/User");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const Category = require("../model/Category");
const Product = require("../model/Product")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/productimg')
    },
    filename: function (req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

const upload = multer({ storage: storage })


router.get("/dashboard", auth, (req, resp) => {
    resp.render("dashboard")
})

router.get("/adminlogin", (req, resp) => {
    resp.render("adminlogin")
})

router.post("/alogin", async (req, resp) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })

        if (admin.password == req.body.password) {

            const token = await jwt.sign({ _id: admin._id }, process.env.SKEY)
            console.log(token);
            resp.cookie("jwt", token)
            resp.redirect("dashboard")
        }
        else {
            resp.render("adminlogin", { msg: "Invalid credentials" })
        }




    } catch (error) {
        resp.render("adminlogin", { msg: "Invalid credentials" })
    }
})

router.get("/alogout", auth, (req, resp) => {

    resp.clearCookie("jwt")
    resp.redirect("adminlogin");

})

//**************Product category************* */
router.get("/category", auth, async (req, resp) => {
    try {
        const cat = await Category.find();
        resp.render("productcategory", { cdata: cat })
    } catch (error) {

    }

})

router.post("/addcategory", async (req, resp) => {
    try {
        const cat = new Category(req.body)
        await cat.save()
        resp.redirect("/category")
    } catch (error) {
        console.log(error);
    }
})

router.get("/deletecat", auth, async (req, resp) => {
    try {
        const _id = req.query.did;
        await Category.findByIdAndDelete(_id)
        resp.redirect("category")
    } catch (error) {
        console.log(error);
    }
})


//***********************products******************** */

router.get("/products", auth, async (req, resp) => {

    try {
        const cat = await Category.find();
        const prod = await Product.find();
        resp.render("products", { cdata: cat, pdata: prod })
    } catch (error) {
        console.log(error);
    }

})

router.post("/addproduct", upload.single("file"), async (req, resp) => {

    try {

        const prod = new Product({
            cid: req.body.cid,
            pname: req.body.pname,
            price: req.body.price,
            qty: req.body.qty,
            imgname: req.file.filename
        })
        await prod.save();
        resp.redirect("products")
    } catch (error) {
        console.log(error);
    }


})

//****************users************* */

router.get("/viewuser", async (req, resp) => {
    try {
        const user = await User.find();
        resp.render("userdetail", { udata: user })
    } catch (error) {
        console.log(error);
    }
})

//***************************order******* */

const Order = require("../model/Order")
router.get("/viewOrder", async (req, resp) => {
    try {
        const order = await Order.find();
        resp.render("orderdetails", { odata: order })
    } catch (error) {

    }
})

module.exports = router