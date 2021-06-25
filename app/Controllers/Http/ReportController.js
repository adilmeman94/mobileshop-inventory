"use strict";

const Purchase = use("App/Models/Purchase");
const Sell = use("App/Models/Sell");
const Complaint = use('App/Models/Complaint');
const Product = use("App/Models/Product");
const StoreProduct = use("App/Models/StoreProduct");
const SpreadSheet = use("SpreadSheet");
const moment = use("moment");

class ReportController {
  async purchaseReport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    const { startDate, endDate } = request.get();

    const purchase = Purchase.query();
    if (startDate) {
      purchase.where({ created_at: { $gte: startDate } });
    }
    if (endDate) {
      purchase.where({
        created_at: {
          $lt: moment(endDate).add(1, "days").format("YYYY-MM-DD"),
        },
      });
    }

    const purchases = await purchase.fetch();
    // const purchases = await Purchase.where({ created_at: { $gte: startDate } })
    //   .where({ created_at: { $lt: moment(endDate).add(1, 'days').format('YYYY-MM-DD') } })
    //   .fetch();
    const data = [];

    data.push([
      "id",
      "Date",
      "Seller Name",
      "Seller Contact No.",
      "Purchase Description",
      "Bill Amount",
      "Paid Amount",
    ]);

    purchases.toJSON().forEach((purchase) => {
      data.push([
        purchase._id,
        moment(purchase.created_at).format("DD-MM-YYYY, hh:mm:ss"),
        purchase.sellerName,
        purchase.sellerContact.toString(),
        purchase.purchaseDescription,
        purchase.billAmount,
        purchase.paidAmount,
      ]);
    });

    ss.addSheet("Purchses", data);
    ss.download("purchse-export");
  }

  async sellReport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    const { startDate, endDate } = request.get();

    const sell = Sell.query();
    if (startDate) {
      sell.where({ created_at: { $gte: startDate } });
    }
    if (endDate) {
      sell.where({
        created_at: {
          $lt: moment(endDate).add(1, "days").format("YYYY-MM-DD"),
        },
      });
    }

    const sells = await sell.fetch();

    // const sells = await Sell.where({ created_at: { $gte: startDate } })
    //   .where({ created_at: { $lt: moment(endDate).add(1, 'days').format('YYYY-MM-DD') } })
    //   .fetch();
    const data = [];

    data.push([
      "id",
      "Date",
      "Customer Name",
      "Customer Contact No.",
      "Product Detail",
      "Bill Amount",
    ]);

    sells.toJSON().forEach((sell) => {
      data.push([
        sell._id,
        moment(sell.created_at).format("DD-MM-YYYY, hh:mm:ss"),
        sell.customerName,
        sell.customerMobile,
        JSON.stringify(sell.productDetail),
        sell.billAmount,
      ]);
    });

    ss.addSheet("Sell", data);
    ss.download("sell-export");
  }

  async complaintReport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    const { startDate, endDate } = request.get();

    const complaint = Complaint.query();
    if (startDate) {
      complaint.where({ created_at: { $gte: startDate } });
    }
    if (endDate) {
      complaint.where({
        created_at: {
          $lt: moment(endDate).add(1, "days").format("YYYY-MM-DD"),
        },
      });
    }

    const complaints = await complaint.fetch();
    const data = [];

    data.push([
      "id",
      "Date",
      "Customer Name",
      "Customer Contact No.",
      "Issue Detail",
      "Status",
    ]);

    complaints.toJSON().forEach((complaint) => {
      data.push([
        complaint._id,
        moment(complaint.created_at).format("DD-MM-YYYY, hh:mm:ss"),
        complaint.customerName,
        complaint.customerMobile,
        complaint.issueDetail,
        complaint.complaintStatus,
      ]);
    });

    ss.addSheet("Complaint", data);
    ss.download("complain-export");
  }

  async productReport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    const { startDate, endDate } = request.get();

    const product = Product.query();
    if (startDate) {
      product.where({ created_at: { $gte: startDate } });
    }
    if (endDate) {
      product.where({
        created_at: {
          $lt: moment(endDate).add(1, "days").format("YYYY-MM-DD"),
        },
      });
    }

    const products = await product.fetch();
    const data = [];

    data.push([
      "id",
      "Date",
      "Product Name",
      "Brand Name",
      "Product Price",
      "Discount Price",
      "Final Price"
    ]);

    products.toJSON().forEach((product) => {
      data.push([
        product._id,
        moment(product.created_at).format("DD-MM-YYYY, hh:mm:ss"),
        product.productName,
        product.brandName,
        product.productPrice,
        product.discountPrice,
        product.finalPrice
      ]);
    });

    ss.addSheet("Product", data);
    ss.download("product-export");
  }

  async stockReport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    const { storeId, productId } = request.get();

    const storeproduct = StoreProduct.query();
    if (storeId) {
      storeproduct.where("storeId" , storeId);
    }
    if (productId) {
      storeproduct.where("productId" , productId);
    }

    const storeProduct = await storeproduct.with("products").with("stores").fetch();
    // console.log(storeProduct.toJSON())
    const data = [];

    data.push([
      "id",
      "Date",
      "Product Name",
      "Store Name",
      "Stock Detail"
    ]);

    storeProduct.toJSON().forEach((product) => {
      data.push([
        product._id,
        moment(product.created_at).format("DD-MM-YYYY, hh:mm:ss"),
        product.products.map(item =>  item.productName),
        product.stores.map(item => item.storeName),
        product.stock
      ]);
    });

    ss.addSheet("stockProduct", data);
    ss.download("stock-export");
  }
}

module.exports = ReportController;
