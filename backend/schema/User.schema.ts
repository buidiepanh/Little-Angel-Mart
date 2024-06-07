import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, text } from "@keystone-6/core/fields";

const User = list({
  access: allowAll,

  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    userEmail: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    userPassword: password({
      validation: {
        isRequired: true,
        length: { min: 5, max: 20 },
      },
    }),
    userPhone: text({
      validation: { isRequired: true },
    }),
    userAddress: text({}),
    userRole: text({}),
  },
});

export default User;
