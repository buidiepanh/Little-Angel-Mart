CREATE DATABASE LittleAngelMilk
Use LittleAngelMilk
CREATE TABLE "PreOrdersPayment"(
    "PaymentID" NVARCHAR(10) NOT NULL,
    "PreOrdersID" NVARCHAR(10) NOT NULL,
    "paymentDate" DATE NOT NULL,
    "paymentMethod" NVARCHAR(100) NOT NULL,
    "amountPaid" FLOAT NOT NULL,
    "accountNo" NVARCHAR(15) NOT NULL
);
ALTER TABLE
    "PreOrdersPayment" ADD CONSTRAINT "preorderspayment_paymentid_primary" PRIMARY KEY("PaymentID");
CREATE TABLE "InvoiceStatus"(
    "InvoiceStatusID" NVARCHAR(10) NOT NULL,
    "StatusName" NVARCHAR(20) NOT NULL
);
ALTER TABLE
    "InvoiceStatus" ADD CONSTRAINT "invoicestatus_invoicestatusid_primary" PRIMARY KEY("InvoiceStatusID");
CREATE TABLE "PreOrders"(
    "PreOrdersID" NVARCHAR(10) NOT NULL,
    "ProductID" NVARCHAR(10) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "Quantity" INT NOT NULL,
    "OrderDate" DATE NOT NULL
);
ALTER TABLE
    "PreOrders" ADD CONSTRAINT "preorders_preordersid_primary" PRIMARY KEY("PreOrdersID");
CREATE TABLE "Staff"(
    "staffID" NVARCHAR(10) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "hiredDate" DATE NOT NULL,
    "salary" FLOAT NOT NULL,
    "staffStatus" NVARCHAR(19) NOT NULL
);
ALTER TABLE
    "Staff" ADD CONSTRAINT "staff_staffid_primary" PRIMARY KEY("staffID");
CREATE TABLE "UserAccount"(
    "UserID" NVARCHAR(10) NOT NULL,
    "userName" NVARCHAR(255) NOT NULL,
    "userPassword" NVARCHAR(255) NOT NULL,
    "userEmail" NVARCHAR(255) NOT NULL,
    "PhoneNumber" NVARCHAR(12) NOT NULL,
    "Address" NVARCHAR(255) NOT NULL,
    "RoleName" NVARCHAR(30) NOT NULL
);
ALTER TABLE
    "UserAccount" ADD CONSTRAINT "useraccount_userid_primary" PRIMARY KEY("UserID");
CREATE TABLE "Category"(
    "CategoryID" NVARCHAR(10) NOT NULL,
    "categoryName" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Category" ADD CONSTRAINT "category_categoryid_primary" PRIMARY KEY("CategoryID");
CREATE TABLE "Voucher"(
    "VoucherID" NVARCHAR(10) NOT NULL,
    "discount" FLOAT NOT NULL,
    "CreatedDate" DATE NOT NULL,
    "ExpiredDate" DATE NOT NULL,
    "Type" BIGINT NOT NULL
);
ALTER TABLE
    "Voucher" ADD CONSTRAINT "voucher_voucherid_primary" PRIMARY KEY("VoucherID");
CREATE TABLE "Product"(
    "ProductID" NVARCHAR(10) NOT NULL,
    "CategoryID" NVARCHAR(10) NOT NULL,
    "productName" NVARCHAR(255) NOT NULL,
    "productPrice" FLOAT NOT NULL,
    "productImage" NVARCHAR(255) NOT NULL,
    "productDesc" NVARCHAR(255) NOT NULL,
    "QuantitySold" INT NOT NULL
);
ALTER TABLE
    "Product" ADD CONSTRAINT "product_productid_primary" PRIMARY KEY("ProductID");
CREATE TABLE "Articles"(
    "ArticleID" NVARCHAR(10) NOT NULL,
    "staffID" NVARCHAR(10) NOT NULL,
    "Title" NVARCHAR(255) NOT NULL,
    "Content" TEXT NOT NULL,
    "Thumbnail" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Articles" ADD CONSTRAINT "articles_articleid_primary" PRIMARY KEY("ArticleID");
CREATE TABLE "Cart"(
    "CartID" NVARCHAR(10) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "CreatedDate" DATE NOT NULL
);
ALTER TABLE
    "Cart" ADD CONSTRAINT "cart_cartid_primary" PRIMARY KEY("CartID");
CREATE TABLE "OrdersPayment"(
    "PaymentID" NVARCHAR(10) NOT NULL,
    "OrderID" NVARCHAR(10) NOT NULL,
    "paymentDate" DATE NOT NULL,
    "paymentMethod" NVARCHAR(100) NOT NULL,
    "amountPaid" FLOAT NOT NULL,
    "accountNo" NVARCHAR(15) NOT NULL
);
ALTER TABLE
    "OrdersPayment" ADD CONSTRAINT "orderspayment_paymentid_primary" PRIMARY KEY("PaymentID");
CREATE TABLE "Invoice"(
    "InvoiceID" NVARCHAR(10) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "totalPrice" FLOAT NOT NULL,
    "createDate" DATE NOT NULL,
    "OrdersStatusID" NVARCHAR(10) NOT NULL
);
ALTER TABLE
    "Invoice" ADD CONSTRAINT "invoice_invoiceid_primary" PRIMARY KEY("InvoiceID");
CREATE TABLE "Feedback"(
    "FeedbackID" NVARCHAR(12) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "ProductID" NVARCHAR(10) NOT NULL,
    "Comment" NVARCHAR(255) NOT NULL,
    "Rating" FLOAT NOT NULL
);
ALTER TABLE
    "Feedback" ADD CONSTRAINT "feedback_feedbackid_primary" PRIMARY KEY("FeedbackID");
CREATE TABLE "UsersVoucher"(
    "UserVoucherID" NVARCHAR(10) NOT NULL,
    "UserID" NVARCHAR(10) NOT NULL,
    "VoucherID" NVARCHAR(10) NOT NULL,
    "VoucherStatus" NVARCHAR(10) NOT NULL
);
ALTER TABLE
    "UsersVoucher" ADD CONSTRAINT "usersvoucher_uservoucherid_primary" PRIMARY KEY("UserVoucherID");
CREATE TABLE "CartDetail"(
    "CarDetailID" NVARCHAR(10) NOT NULL,
    "CartID" NVARCHAR(10) NOT NULL,
    "ProductID" NVARCHAR(10) NOT NULL,
    "VoucherID" NVARCHAR(10) NOT NULL,
    "quantity" INT NOT NULL,
    "price" FLOAT NOT NULL
);
ALTER TABLE
    "CartDetail" ADD CONSTRAINT "cartdetail_cardetailid_primary" PRIMARY KEY("CarDetailID");
ALTER TABLE
    "Invoice" ADD CONSTRAINT "invoice_userid_foreign" FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID");
ALTER TABLE
    "Cart" ADD CONSTRAINT "cart_cartid_foreign" FOREIGN KEY("CartID") REFERENCES "UserAccount"("UserID");
ALTER TABLE
    "Invoice" ADD CONSTRAINT "invoice_ordersstatusid_foreign" FOREIGN KEY("OrdersStatusID") REFERENCES "InvoiceStatus"("InvoiceStatusID");
ALTER TABLE
    "Articles" ADD CONSTRAINT "articles_staffid_foreign" FOREIGN KEY("staffID") REFERENCES "Staff"("staffID");
ALTER TABLE
    "UsersVoucher" ADD CONSTRAINT "usersvoucher_voucherid_foreign" FOREIGN KEY("VoucherID") REFERENCES "Voucher"("VoucherID");
ALTER TABLE
    "OrdersPayment" ADD CONSTRAINT "orderspayment_orderid_foreign" FOREIGN KEY("OrderID") REFERENCES "Invoice"("InvoiceID");
ALTER TABLE
    "UsersVoucher" ADD CONSTRAINT "usersvoucher_userid_foreign" FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID");
ALTER TABLE
    "CartDetail" ADD CONSTRAINT "cartdetail_productid_foreign" FOREIGN KEY("ProductID") REFERENCES "Product"("ProductID");
ALTER TABLE
    "Feedback" ADD CONSTRAINT "feedback_productid_foreign" FOREIGN KEY("ProductID") REFERENCES "Product"("ProductID");
ALTER TABLE
    "PreOrdersPayment" ADD CONSTRAINT "preorderspayment_preordersid_foreign" FOREIGN KEY("PreOrdersID") REFERENCES "PreOrders"("PreOrdersID");
ALTER TABLE
    "CartDetail" ADD CONSTRAINT "cartdetail_cartid_foreign" FOREIGN KEY("CartID") REFERENCES "Cart"("CartID");
ALTER TABLE
    "Product" ADD CONSTRAINT "product_categoryid_foreign" FOREIGN KEY("CategoryID") REFERENCES "Category"("CategoryID");
ALTER TABLE
    "Staff" ADD CONSTRAINT "staff_userid_foreign" FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID");
ALTER TABLE
    "PreOrders" ADD CONSTRAINT "preorders_productid_foreign" FOREIGN KEY("ProductID") REFERENCES "Product"("ProductID");
ALTER TABLE
    "CartDetail" ADD CONSTRAINT "cartdetail_voucherid_foreign" FOREIGN KEY("VoucherID") REFERENCES "Voucher"("VoucherID");
ALTER TABLE
    "PreOrders" ADD CONSTRAINT "preorders_userid_foreign" FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID");
ALTER TABLE
    "Feedback" ADD CONSTRAINT "feedback_userid_foreign" FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID");
