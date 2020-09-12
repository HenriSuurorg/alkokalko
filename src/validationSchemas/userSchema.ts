import * as Yup from "yup";

export const userSchema = Yup.object({
  weight: Yup.number()
    .max(320, "Sisesta oma kaal kilogrammides")
    .required("See väli on kohustuslik"),
  height: Yup.number()
    .max(235, "Sisesta oma pikkus sentimeetrites")
    .required("See väli on kohustuslik"),
  age: Yup.number()
    .max(120, "Sisesta oma vanus aastates")
    .required("See väli on kohustuslik"),
  sex: Yup.string()
    .min(4, "See väli on kohustuslik")
    .required("See väli on kohustuslik"),
  stomachState: Yup.string()
    .min(4, "See väli on kohustuslik")
    .required("See väli on kohustuslik"),
  drinkingHabits: Yup.string()
    .min(4, "See väli on kohustuslik")
    .required("See väli on kohustuslik"),
});
