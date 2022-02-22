import dbInit from "@/db/dbInit.js"
import Order from "../models/orderModel.js"

const handler = async (req, res) => {
  const method = req.method
  const { fileName } = req.query

  switch (method) {
    case "GET":

    case "POST":
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
    case "PUT":
      try {
        const order = await Order.findById(req.params.id)
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
  }
}

export default dbInit(handler)
