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
  },
});

export default Product;
