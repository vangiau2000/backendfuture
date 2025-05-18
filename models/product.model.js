const mongoose = require("mongoose");
const slugify = require("slugify");

const userSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true }
);
userSchema.pre("validate", async function (next) {
  if (this.title && !this.slug) {
    const rawSlug = slugify(this.title, { lower: true, strict: true });
    let newSlug = rawSlug;
    let i = 1;

    // Kiểm tra trùng slug
    const Model = mongoose.model("Product", userSchema); // cần để dùng trong pre hook
    while (await Model.exists({ slug: newSlug })) {
      newSlug = `${rawSlug}-${i++}`;
    }

    this.slug = newSlug;
  }
  next();
});
const Product = mongoose.model("Product", userSchema);
module.exports = Product;
