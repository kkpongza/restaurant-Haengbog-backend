const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
      type: Number,
      unique: true,
      require: [true, 'Please add a orderNumber']
    },
    userName: {
      type: String,
      require: [true, 'Please add a userName']
    },
    foods: [
      {
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
            type: Number,
            require: true
        }
      },
    ],
    // food: {
    //     type: String,
    //     require: [true, 'Please add a foodName']
    // },
    totalPrice: {
      type: Number,
      get: async function () {
        // Calculate total price based on the prices of individual foods
        //loop in array food
        return await this.foods.reduce((total, food) => total + (food.price * food.quantity), 0);
      },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    }
  });

// Middleware to automatically generate orderNumber
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
      const lastOrder = await this.constructor.findOne({}, {}, { sort: { orderNumber: -1 } });
  
      if (lastOrder) {
        this.orderNumber = lastOrder.orderNumber + 1;
      } else {
        this.orderNumber = 1;
      }
    }
  
    next();
});

module.exports = mongoose.model('Order', orderSchema);