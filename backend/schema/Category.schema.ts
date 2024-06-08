import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

const Category = list({
  access: allowAll,
  fields: {
    categoryName: text({
      validation: { isRequired: true },
    }),
  },
});

export default Category;
