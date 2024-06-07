import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import {
  text,
  relationship,
  select,
  integer,
  image,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import "dotenv/config";

const Product = list({
  access: allowAll,

  fields: {
    productName: text({
      label: "Tên sản phẩm",
    }),
    productDescription: document({
      label: "Miêu tả về sản phẩm",
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [1, 1, 1, 1],
      ],
    }),
    productCategory: relationship({
      label: "Nhóm sản phẩm",
      ref: "Category",
      many: true,
    }),
    productPrice: integer({
      label: "Giá sản phẩm",
      validation: { isRequired: true },
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`,
      },
    }),
  },
});

export default Product;
