import orderModel from "../models/orderModel.js"
const Order = orderModel

const orderRoute = (server) => {
  server.post("/", isAuth, async (req, res) => {
    try {
      const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
      })
      const newOrderCreated = await newOrder.save()
      res
        .status(201)
        .send({ message: "New Order Created", data: newOrderCreated })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })

  server.put("/:id/pay", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id)
    try {
      if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.payment = {
          paymentMethod: "paypal",
          paymentResult: {
            payerID: req.body.payerID,
            orderID: req.body.orderID,
            paymentID: req.body.paymentID,
          },
        }
        const updatedOrder = await order.save()
        res.send({ message: "Order Paid.", order: updatedOrder })
      } else {
        res.status(404).send({ message: "Order not found." })
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })
}
export default orderRoute
