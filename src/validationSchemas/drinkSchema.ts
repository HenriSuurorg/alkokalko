import * as Yup from "yup";

export const drinkSchema = Yup.object({
  type: Yup.string()
    .required("See väli on kohustuslik")
    .min(4, "See väli on kohustuslik"),
  volume: Yup.number().required("See väli on kohustuslik"),
  unit: Yup.string()
    .required("See väli on kohustuslik")
    .min(2, "See väli on kohustuslik"),
  timePassed: Yup.number().max(30).required("See väli on kohustuslik"),
  abv: Yup.number()
    .max(100, "Siseta joogi kangus protsentides")
    .required("See väli on kohustuslik"),
});
