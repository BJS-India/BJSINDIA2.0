import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Basket name is required'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    logo: {
      url: {
        type: String,
        default: '',
        trim: true,
      },
      key: {
        type: String,
        default: '',
        trim: true,
      },
    },
    tagline: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Slug auto-generation fallback
basketSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Virtual populate for programs under this basket
basketSchema.virtual('programs', {
  ref: 'Program',
  localField: '_id',
  foreignField: 'basketId',
  match: { isDeleted: false },
});

const Basket = mongoose.model('Basket', basketSchema, 'baskets');

export default Basket;

