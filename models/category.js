const { stringify } = require("jade/lib/utils");

module.exports = mongoose => {
    const Category = mongoose.model(
      "category",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean,
          sku: String,
          images:Array,
          color:Array,
          size: Array,
          price: Object,
          quantity:Object,
        },
        { timestamps: true }
      )
    );
    return Category;
  };